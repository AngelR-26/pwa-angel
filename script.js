let queue = [];

const productInput = document.getElementById("product");
const quantityInput = document.getElementById("quantity");
const registerButton = document.getElementById("registerButton");
const syncButton = document.getElementById("syncButton");
const operationsContainer = document.getElementById("operations");

function saveQueue() {
    localStorage.setItem(
        "operations",
        JSON.stringify(queue)
    );
}

function loadQueue() {
    const savedOperations =
        localStorage.getItem("operations");

    if (savedOperations) {
        queue = JSON.parse(savedOperations);
    }

    renderOperations();
}

function renderOperations() {

    operationsContainer.innerHTML = "";

    queue.forEach(operation => {

        const div = document.createElement("div");

        div.className =
            `operation ${operation.status}`;

        div.setAttribute(
            "data-operation-id",
            operation.operationId
        );

        div.setAttribute(
            "data-status",
            operation.status
        );

        div.innerHTML = `
            <p><strong>Producto:</strong>
            ${operation.payload.product}</p>

            <p><strong>Cantidad:</strong>
            ${operation.payload.quantity}</p>

            <p><strong>ID:</strong>
            ${operation.operationId}</p>

            <p><strong>Estado:</strong>
            ${operation.status}</p>
        `;

        if (operation.status === "failed") {

            const retryButton =
                document.createElement("button");

            retryButton.textContent = "Reintentar";

            retryButton.addEventListener(
                "click",
                () => retryOperation(operation.operationId)
            );

            div.appendChild(retryButton);
        }

        operationsContainer.appendChild(div);
    });
}

registerButton.addEventListener(
    "click",
    () => {

        const product =
            productInput.value.trim();

        const quantity =
            Number(quantityInput.value);

        if (!product || quantity <= 0) {
            alert("Complete todos los campos");
            return;
        }

        const operation = {
            operationId: crypto.randomUUID(),
            type: "CREATE_SALE",
            payload: {
                product: product,
                quantity: quantity
            },
            status: "pending"
        };

        queue.push(operation);

        saveQueue();
        renderOperations();

        productInput.value = "";
        quantityInput.value = "";
    }
);

function fakeServerRequest(operation) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            const success =
                Math.random() > 0.4;

            if (success) {

                resolve({
                    message:
                        "Operación procesada"
                });

            } else {

                reject(
                    new Error(
                        "Error del servidor"
                    )
                );
            }

        }, 2000);

    });
}

async function syncOperations() {

    const pendingOperations =
        queue.filter(
            operation =>
                operation.status === "pending"
        );

    for (const operation of pendingOperations) {

        operation.status = "inFlight";

        saveQueue();
        renderOperations();

        try {

            await fakeServerRequest(
                operation
            );

            operation.status = "done";

        } catch (error) {

            operation.status = "failed";
        }

        saveQueue();
        renderOperations();
    }
}

syncButton.addEventListener(
    "click",
    syncOperations
);

function retryOperation(operationId) {

    const operation =
        queue.find(
            item =>
                item.operationId === operationId
        );

    if (!operation) return;

    operation.status = "pending";

    saveQueue();
    renderOperations();
}

loadQueue();