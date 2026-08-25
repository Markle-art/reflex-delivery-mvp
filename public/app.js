const SUPABASE_URL = "https://gloealmsrpaxyujxxicw.supabase.co";
const SUPABASE_KEY = "sb_publishable_MUeDyzptwLqwi6McFJFY_w_TYvMTa0_";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ================================
// ROLE SELECTION
// ================================

function showRetailer() {
    document.getElementById("role-selection").classList.add("hidden");
    document.getElementById("dispatcher-dashboard").classList.add("hidden");
    document.getElementById("rider-dashboard").classList.add("hidden");

    document.getElementById("retailer-dashboard").classList.remove("hidden");
}


function showDispatcher() {
    document.getElementById("role-selection").classList.add("hidden");
    document.getElementById("retailer-dashboard").classList.add("hidden");
    document.getElementById("rider-dashboard").classList.add("hidden");

    document.getElementById("dispatcher-dashboard").classList.remove("hidden");

    loadOpenDeliveries();
}


function showRider() {
    document.getElementById("role-selection").classList.add("hidden");

    document.getElementById("retailer-dashboard").classList.add("hidden");

    document.getElementById("dispatcher-dashboard").classList.add("hidden");

    document.getElementById("rider-dashboard").classList.remove("hidden");

    loadRiderDeliveries();
}


// ================================
// RETAILER
// ================================

const deliveryForm = document.getElementById("delivery-form");

if (deliveryForm) {

    deliveryForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const customerName =
            document.getElementById("customer-name").value.trim();

        const customerPhone =
            document.getElementById("customer-phone").value.trim();

        const address =
            document.getElementById("address").value.trim();

        const itemDescription =
            document.getElementById("item-description").value.trim();

        const message =
            document.getElementById("delivery-message");


        const { data: retailer, error: retailerError } =
            await supabaseClient
                .from("users")
                .select("id")
                .eq("role", "retailer")
                .limit(1)
                .single();


        if (retailerError) {
            console.error(retailerError);

            message.textContent =
                "Could not find retailer account.";

            return;
        }


        const { error } =
            await supabaseClient
                .from("deliveries")
                .insert({
                    customer_name: customerName,
                    customer_phone: customerPhone,
                    address: address,
                    item_description: itemDescription,
                    retailer_id: retailer.id,
                    status: "Created"
                });


        if (error) {
            console.error(error);

            message.textContent =
                "Could not create delivery.";

            return;
        }


        message.textContent =
            "Delivery request created successfully.";

        deliveryForm.reset();
    });
}


// ================================
// DISPATCHER
// ================================

async function loadOpenDeliveries() {

    const deliveryList =
        document.getElementById("delivery-list");

    deliveryList.innerHTML =
        "<p>Loading deliveries...</p>";


    try {

        const { data: riders, error: ridersError } =
            await supabaseClient
                .from("users")
                .select("id, name")
                .eq("role", "rider")
                .order("name");


        if (ridersError) {
            throw ridersError;
        }


        const { data: deliveries, error: deliveryError } =
            await supabaseClient
                .from("deliveries")
                .select(
                    "id, customer_name, customer_phone, address, item_description, status, rider_id, created_at"
                )
                .eq("status", "Created")
                .is("rider_id", null)
                .order("created_at", {
                    ascending: false
                });


        if (deliveryError) {
            throw deliveryError;
        }


        if (!deliveries || deliveries.length === 0) {

            deliveryList.innerHTML =
                "<p>No open delivery requests.</p>";

            return;
        }


        deliveryList.innerHTML = "";


        deliveries.forEach(function (delivery) {

            const deliveryCard =
                document.createElement("div");

            deliveryCard.className =
                "delivery-card";


            let riderOptions = "";

            riders.forEach(function (rider) {

                riderOptions += `
                    <option value="${rider.id}">
                        ${rider.name}
                    </option>
                `;
            });


            deliveryCard.innerHTML = `

                <h4>Delivery Request</h4>

                <p>
                    <strong>Customer:</strong>
                    ${delivery.customer_name}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${delivery.customer_phone}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${delivery.address}
                </p>

                <p>
                    <strong>Item:</strong>
                    ${delivery.item_description}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${delivery.status}
                </p>

                <label>Assign Rider</label>

                <select id="rider-${delivery.id}">
                    <option value="">
                        Select a rider
                    </option>

                    ${riderOptions}
                </select>

                <button
                    onclick="assignRider('${delivery.id}')"
                >
                    Assign Rider
                </button>

                <p id="assign-message-${delivery.id}"></p>
            `;


            deliveryList.appendChild(
                deliveryCard
            );
        });


    } catch (error) {

        console.error(
            "Dispatcher error:",
            error
        );

        deliveryList.innerHTML =
            "<p>Dispatcher error: " +
            error.message +
            "</p>";
    }
}


// ================================
// ASSIGN RIDER
// ================================

async function assignRider(deliveryId) {

    const riderSelect =
        document.getElementById(
            `rider-${deliveryId}`
        );

    const message =
        document.getElementById(
            `assign-message-${deliveryId}`
        );


    const riderId =
        riderSelect.value;


    if (!riderId) {

        message.textContent =
            "Please select a rider.";

        return;
    }


    const { error } =
        await supabaseClient
            .from("deliveries")
            .update({
                rider_id: riderId,
                status: "Assigned",
                updated_at: new Date().toISOString()
            })
            .eq("id", deliveryId)
            .eq("status", "Created")
            .is("rider_id", null);


    if (error) {

        console.error(error);

        message.textContent =
            "Could not assign rider.";

        return;
    }


    message.textContent =
        "Rider assigned successfully.";


    setTimeout(function () {
        loadOpenDeliveries();
    }, 500);
}


// ================================
// RIDER
// ================================

async function loadRiderDeliveries() {

    const riderList =
        document.getElementById(
            "rider-delivery-list"
        );


    if (!riderList) {
        return;
    }


    riderList.innerHTML =
        "<p>Loading your deliveries...</p>";


    try {

        // Find Brian
        const { data: rider, error: riderError } =
            await supabaseClient
                .from("users")
                .select("id, name")
                .eq("role", "rider")
                .limit(1)
                .single();


        if (riderError) {
            throw riderError;
        }


        console.log(
            "Rider found:",
            rider
        );


        // Find deliveries assigned to Brian
        const { data: deliveries, error: deliveryError } =
            await supabaseClient
                .from("deliveries")
                .select(
                    "id, customer_name, customer_phone, address, item_description, status"
                )
                .eq("rider_id", rider.id)
                .in("status", [
                    "Assigned",
                    "Picked Up"
                ])
                .order("created_at", {
                    ascending: false
                });


        if (deliveryError) {
            throw deliveryError;
        }


        console.log(
            "Rider deliveries:",
            deliveries
        );


        if (!deliveries || deliveries.length === 0) {

            riderList.innerHTML =
                "<p>No assigned deliveries.</p>";

            return;
        }


        riderList.innerHTML = "";


        deliveries.forEach(function (delivery) {

            const deliveryCard =
                document.createElement("div");

            deliveryCard.className =
                "delivery-card";


            let actionButton = "";


            if (delivery.status === "Assigned") {

                actionButton = `
                    <button
                        onclick="updateDeliveryStatus(
                            '${delivery.id}',
                            'Picked Up'
                        )"
                    >
                        Mark as Picked Up
                    </button>
                `;

            } else if (delivery.status === "Picked Up") {

                actionButton = `
                    <button
                        onclick="updateDeliveryStatus(
                            '${delivery.id}',
                            'Delivered'
                        )"
                    >
                        Mark as Delivered
                    </button>
                `;
            }


            deliveryCard.innerHTML = `

                <h4>My Delivery</h4>

                <p>
                    <strong>Customer:</strong>
                    ${delivery.customer_name}
                </p>

                <p>
                    <strong>Phone:</strong>
                    ${delivery.customer_phone}
                </p>

                <p>
                    <strong>Address:</strong>
                    ${delivery.address}
                </p>

                <p>
                    <strong>Item:</strong>
                    ${delivery.item_description}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${delivery.status}
                </p>

                ${actionButton}
            `;


            riderList.appendChild(
                deliveryCard
            );
        });


    } catch (error) {

        console.error(
            "Rider error:",
            error
        );

        riderList.innerHTML =
            "<p>Rider error: " +
            error.message +
            "</p>";
    }
}


// ================================
// UPDATE STATUS
// ================================

async function updateDeliveryStatus(
    deliveryId,
    newStatus
) {

    const { error } =
        await supabaseClient
            .from("deliveries")
            .update({
                status: newStatus,
                updated_at: new Date().toISOString()
            })
            .eq("id", deliveryId);


    if (error) {

        console.error(
            "Status update error:",
            error
        );

        alert(
            "Could not update delivery status."
        );

        return;
    }


    loadRiderDeliveries();
}
async function loadRiderDeliveries() {

    const riderList =
        document.getElementById("rider-delivery-list");

    riderList.innerHTML =
        "<p>Loading your deliveries...</p>";


    const { data: rider, error: riderError } =
        await supabaseClient
            .from("users")
            .select("id, name")
            .eq("role", "rider")
            .limit(1)
            .single();


    if (riderError) {

        console.error(riderError);

        riderList.innerHTML =
            "<p>Could not find rider account.</p>";

        return;
    }


    const { data: deliveries, error: deliveryError } =
        await supabaseClient
            .from("deliveries")
            .select(
                "id, customer_name, customer_phone, address, item_description, status"
            )
            .eq("rider_id", rider.id)
            .in("status", [
                "Assigned",
                "Picked Up"
            ]);


    if (deliveryError) {

        console.error(deliveryError);

        riderList.innerHTML =
            "<p>Could not load deliveries.</p>";

        return;
    }


    if (!deliveries || deliveries.length === 0) {

        riderList.innerHTML =
            "<p>No assigned deliveries.</p>";

        return;
    }


    riderList.innerHTML = "";


    deliveries.forEach(function (delivery) {

        const card =
            document.createElement("div");

        card.className =
            "delivery-card";


        card.innerHTML = `
            <h4>My Delivery</h4>

            <p>
                <strong>Customer:</strong>
                ${delivery.customer_name}
            </p>

            <p>
                <strong>Phone:</strong>
                ${delivery.customer_phone}
            </p>

            <p>
                <strong>Address:</strong>
                ${delivery.address}
            </p>

            <p>
                <strong>Item:</strong>
                ${delivery.item_description}
            </p>

            <p>
                <strong>Status:</strong>
                ${delivery.status}
            </p>

            ${
                delivery.status === "Assigned"
                ? `
                    <button
                        onclick="updateDeliveryStatus(
                            '${delivery.id}',
                            'Picked Up'
                        )"
                    >
                        Mark as Picked Up
                    </button>
                `
                : `
                    <button
                        onclick="updateDeliveryStatus(
                            '${delivery.id}',
                            'Delivered'
                        )"
                    >
                        Mark as Delivered
                    </button>
                `
            }
        `;


        riderList.appendChild(card);
    });
}