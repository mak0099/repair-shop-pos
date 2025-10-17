# System Requirements: Mobile Shop Management System

**Version:** 1.0
**Date:** 2025-10-02

## 1. Project Overview

### 1.1 Project Name
Mobile Shop Management System

### 1.2 Primary Goal
The primary goal is to develop a custom, all-in-one management application to replace an existing Drupal-based system. The new system must achieve two main objectives:
1.  **Eliminate Recurring Costs:** Build a self-owned application with a one-time development cost, removing the need for yearly subscriptions.
2.  **Utilize Modern Technology:** Build the system on a modern, high-performance technology stack for better speed, user experience, and long-term maintainability.

### 1.3 Core Modules
The system will be composed of the following core functional modules:
- Repair Management (Acceptances)
- Sales Management (Inventory-linked & General)
- Inventory & Product Management
- People Management (Customers, Users, Suppliers)
- Expenses Management
- System Settings

---

## 2. User Roles & Permissions

The system will support multiple user roles with different levels of access.

* **Administrator:** Has full super-user access to the entire system. Can manage all data, settings, and other users.
* **Manager:** Has access to high-level business operations. Can view sales reports, manage inventory, oversee repair statuses, and manage staff.
* **Technician:** Primarily focused on the repair workflow. Can view assigned jobs, update repair statuses, add work notes, and manage spare parts used for a repair.
* **Executive / Frontdesk:** Handles day-to-day customer-facing operations. Can create new repair jobs, process sales, and manage customer information.

---

## 3. Data Models

This section defines the core data structures for the application in a technology-agnostic format.

**Data Model: Job**
| Field Name | Data Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the repair job. |
| `acceptanceNumber`| String | Yes | Human-readable ID (e.g., "41604-2025"). |
| `customerId` | String (Reference) | Yes | The ID of the associated `Customer`. |
| `createdDate` | DateTime | Yes | Timestamp of when the job was created. |
| `deviceType` | String | Yes | e.g., "Smartphone", "PC / All in One". |
| `brand` | String | Yes | e.g., "Apple", "Samsung". |
| `model` | String | Yes | e.g., "iPhone 14", "iMac A1418". |
| `currentStatus` | String | Yes | The current workflow status (e.g., "In Repair"). |
| `technicianId` | String (Reference) | Yes | The ID of the assigned `User` (technician). |
| `createdById` | String (Reference) | Yes | The ID of the `User` who created the job. |
| `deliveryDate` | DateTime | No | Timestamp of when the device was returned to the customer. |
| `estimatedPrice`| Number | No | The initial price quoted for the repair. |
| `workProgressNotes`| Text | No | Internal log of work performed by technicians. |

**Data Model: Customer**
| Field Name | Data Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the customer. |
| `name` | String | Yes | Full name of the customer. |
| `phone`| String | Yes | Primary contact phone number. |
| `email`| String | No | Optional email address. |

**Data Model: User (Employee)**
| Field Name | Data Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the user. |
| `name` | String | Yes | Full name of the user. |
| `branch`| String | Yes | The branch the user belongs to. |
| `roles`| Array of Strings | Yes | List of roles assigned (e.g., ["Administrator", "Technician"]). |

**Data Model: Supplier**
| Field Name | Data Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the supplier. |
| `name` | String | Yes | Name of the supplier company. |
| `contactPerson`| String | No | Name of the contact person. |
| `phone`| String | Yes | Primary contact phone number. |
| `email`| String | No | Optional email address. |

**Data Model: Product**
| Field Name | Data Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the product. |
| `sku` | String | Yes | Unique Stock Keeping Unit, auto-generated. |
| `name` | String | Yes | The name of the product. |
| `category` | String | Yes | e.g., "Spare Parts", "Accessories". |
| `brand` | String | No | The product's brand. |
| `model` | String | No | The product's model. |
| `condition` | String | No | e.g., "New", "Used", "Refurbished". |
| `purchasePrice`| Number | Yes | The cost price of the product. |
| `desktopPrice` | Number | Yes | The selling price for in-store sales. |
| `onlinePrice`| Number | Yes | The selling price for online sales. |
| `stock`| Integer | Yes | The current quantity in inventory. |

**Data Model: Sale**
| Field Name | Data Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the sale transaction. |
| `customerId` | String (Reference) | Yes | The ID of the associated `Customer`. |
| `items`| Array of `SaleItem` | Yes | List of products sold in the transaction. |
| `totalAmount`| Number | Yes | The final amount of the sale after discounts. |
| `paidAmount` | Number | Yes | The amount paid by the customer. |
| `paymentMethod`| String | Yes | e.g., "Cash", "Card". |
| `date` | DateTime | Yes | Timestamp of the sale. |

**Data Model: SaleItem (sub-model for Sale)**
| Field Name | Data Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `productId` | String (Reference) | Yes | The ID of the `Product` sold. |
| `productName` | String | Yes | The name of the product at the time of sale. |
| `quantity` | Integer | Yes | The quantity sold. |
| `salePrice`| Number | Yes | The price per unit for this transaction. |

**Data Model: Expense**
| Field Name | Data Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the expense. |
| `date` | Date | Yes | The date the expense was incurred. |
| `description`| String | Yes | A brief description of the expense. |
| `category` | String | Yes | e.g., "Rent", "Utilities". |
| `amount` | Number | Yes | The monetary value of the expense. |
## 4. Feature Breakdown

<details>
<summary><h3>4.1 Repair Management (Acceptance)</h3></summary>

This section contains all requirements for the repair job workflow, from creation to completion. It is divided into a master view for technical analysis and specific views for page-by-page verification.

#### **Master Fields & Business Rules**
This consolidated view helps with database design and backend logic by listing every possible field and rule associated with a "Repair Job".

**Master Field Table**

| Field Name | Data Type | Appears On | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| **[Acceptance Number](#acceptance-number-details)** | String | `[List]`, `[Edit]` | Unique, auto-generated ID for the repair job. Format: `XXXXX-YYYY`. |
| **[Customer](#customer-details)** | Reference (Customer ID)| `[List]`, `[Add]`, `[Edit]` | The customer associated with the job. Required. |
| **[Created Date](#created-date-details)** | DateTime | `[List]`, `[Add]`, `[Edit]` | Timestamp of when the job was created. |
| [Estimated Price](#) | Number | `[List]`, `[Add]`, `[Edit]` | Initial estimated cost for the repair. |
| [Brand](#) | String | `[List]`, `[Add]`, `[Edit]` | The brand of the device. Required. |
| [Model](#) | String | `[List]`, `[Add]`, `[Edit]` | The model of the device. Required & filtered by Brand. |
| [Color](#) | String | `[Add]`, `[Edit]` | The color of the device. Required. |
| [Accessories](#) | String | `[Add]`, `[Edit]` | Accessories provided with the device (e.g., SIM, Battery). Required. |
| [Device Type](#) | String | `[List]`, `[Add]`, `[Edit]` | Type of device (e.g., Smartphone, PC). Required. |
| [Current Status](#) | String | `[List]`, `[Add]`, `[Edit]` | The current workflow status of the job. Required. |
| [Defect Description](#) | Text | `[Add]`, `[Edit]` | Customer's description of the problem. |
| [Notes](#) | Text | `[Add]`, `[Edit]` | Technician's notes on the device's physical condition. |
| **[IMEI / Serial No](#imei-serial-no-details)** | String | `[Add]`, `[Edit]` | Unique identifier of the device. Required. |
| [Secondary IMEI](#) | String | `[Add]`, `[Edit]` | Optional second IMEI for dual-SIM devices. |
| [Technician](#) | Reference (User ID) | `[List]`, `[Add]`, `[Edit]` | The technician assigned to the job. Required. |
| [Warranty](#) | String | `[Add]`, `[Edit]` | Warranty status or provider. |
| [Replacement Device](#) | String | `[Add]`, `[Edit]` | A loaner device given to the customer. |
| [Dealer](#) | String | `[Add]`, `[Edit]` | Reference to a dealer or partner shop. |
| [Price Offered](#) | Number | `[Add]`, `[Edit]` | Price offered if the shop is buying the used device. |
| [Reserved Notes](#) | Text | `[Add]`, `[Edit]` | Internal notes, not visible to the customer. |
| **[Pin Unlock](#pin-unlock-details)** | Boolean + String | `[Add]`, `[Edit]` | Flag for whether a pin is provided, and the pin itself. |
| **[Urgent](#urgent-details)** | Boolean + DateTime | `[Add]`, `[Edit]` | Flag for urgent jobs and the promised date/time. |
| [Quote](#) | Boolean | `[Add]`, `[Edit]` | Flag to indicate if this entry is a price quote only. |
| [Photos](#) | Array of Files | `[Add]`, `[Edit]` | Up to 5 images of the device. |
| [Dealer Price](#) | Number | `[Edit]` | Price for dealers/partners. Read-only on the form. |
| [Estimated Repair Price](#)| Number | `[Edit]` | Final or updated price for the repair. |
| [Refund Amount](#) | Number | `[Edit]` | Amount to be refunded. Read-only on the form. |
| **[Payment Method](#payment-method-details)** | String | `[Edit]` | Method used for final payment (Cash, Card, etc.). |
| **[Bill Accepted Amount](#payment-method-details)**| Number | `[Edit]` | The final amount paid by the customer. |
| [Bill Accepted Date](#) | Date | `[Edit]` | The date the bill was paid. |
| [Status Type](#) | String | `[List]`, `[Edit]` | A secondary status, e.g., "Not Repairable". |
| **[Work Progress Notes](#work-progress-notes-details)** | Text | `[Edit]` | Technician's internal log of work performed. |
| **[Spare Parts Used](#spare-parts-used-details)** | Array of Objects | `[Edit]` | Dynamic list of inventory parts used for the repair. |
| **[Delivery Date](#delivery-date-details)** | DateTime | `[List]`, `[Edit]` | Timestamp of when the device was returned to the customer. |
| [Box Number](#) | String (Reference) | `[Edit]` | The physical box/shelf where the device is stored. |
| [Transfer Information](#) | Section | `[Edit]` | UI section to transfer the job to another branch. |

**Common Business Rules:**
- A unique `Acceptance Number` is always auto-generated upon creation and is not user-editable.
- The `Model` dropdown must be dynamically filtered based on the selected `Brand`.
- All dropdowns with a `+` icon must provide a way to add a new entry (e.g., a new Customer, Brand) via a modal.
- The system must maintain a `Revision History` for every change made to a repair job, accessible from the `Edit` page.

---
### **Page-Specific Views**
These sections show the exact fields for each page for easy verification against the old system.

* [Go to Add Acceptance Page Details](#add-acceptance-page)
* [Go to Edit Acceptance Page Details](#edit-acceptance-page)
* [Go to Repair List & Search Page Details](#repair-list-page)

---
<br>

#### **Add Acceptance Page Details** {#add-acceptance-page}
* **Purpose:** To create a new repair job when a customer brings in a device.
* **Page URL:** `/repairs/new`
* **Fields on this Page:**

| Field Label | Field Type | Required |
| :--- | :--- | :--- |
| Customer Name | Searchable Dropdown| Yes |
| Estimated Price | Text Input | No |
| Brand | Searchable Dropdown| Yes |
| Model | Searchable Dropdown| Yes |
| Color | Searchable Dropdown| Yes |
| Accessories | Searchable Dropdown| Yes |
| Device Type | Searchable Dropdown| Yes |
| Current Status | Dropdown | Yes |
| Defect Description | Text Area | No |
| Notes | Text Area | No |
| Created Date | DateTime Picker | Yes |
| IMEI / Serial No | Text Input | Yes |
| Secondary IMEI | Text Input | No |
| Technician | Searchable Dropdown| Yes |
| Warranty | Searchable Dropdown| No |
| Replacement Device | Searchable Dropdown| No |
| Dealer | Text Input | No |
| Price Offered | Text Input | No |
| Reserved Notes | Text Area | No |
| Important Information| Radio (Yes/No) | Yes |
| Pin Unlock | Radio (Yes/No) | Yes |
| Urgent | Radio (Yes/No) | Yes |
| Quote | Radio (Yes/No) | Yes |
| Photo 1-5 | File Upload | No |

<br>

#### **Edit Acceptance Page Details** {#edit-acceptance-page}
* **Purpose:** To view, update, and manage an existing repair job.
* **Page URL:** `/repairs/:id`
* **Fields on this Page:** This page contains all fields from the "Add" page, plus the following new fields and sections, shown in **bold**.

| Field Label | Field Type | Required |
| :--- | :--- | :--- |
| ... *All fields from Add page* ... | ... | ... |
| **Dealer Price** | Text Input (Read-only)| No |
| **Estimated Repair Price**| Text Input | No |
| **Refund Amount** | Text Input (Read-only)| No |
| **Payment Method** | Dropdown | No |
| **Bill Accepted?** | Radio (Yes/No) | No |
| **Bill Accepted Amount**| Text Input | No |
| **Bill Accepted Date**| Date Picker | No |
| **Status Type** | Dropdown | No |
| **Work Progress Notes**| Text Area | No |
| **Repair Date** | Date Picker | No |
| **Delivery Date** | Date Picker | No |
| **Box Number** | Searchable Dropdown| No |
| **Spare Parts Used**| Dynamic List Section | No |
| **Advance Payment?** | Checkbox Section | No |
| **Transfer Information**| Section | No |

<br>

#### **Repair List & Search Page Details** {#repair-list-page}
* **Purpose:** To find and view all repair jobs.
* **Page URL:** `/repairs`
* **Search Fields:**

| Field Name | Field Type |
| :--- | :--- |
| Customer Name | Searchable Dropdown |
| Acceptance Number | Text Input |
| Acceptance Year | Text Input |
| Mobile | Text Input |
| Brand | Dropdown |
| Model | Dropdown |
| IMEI/ Serial No | Text Input |
| Created Date From/To | Date Picker |
| Device Current Status| Dropdown |
| Technician | Dropdown |
| Created By | Dropdown |
| Dealer | Text Input |
| Branch | Dropdown |
| Delivery Date | Date Picker |

* **Table Columns:**

| Column Header | Data Source Field |
| :--- | :--- |
| Number | `acceptanceNumber` |
| Customer | `customer.name` |
| Created Date | `createdDate` |
| Device Type | `deviceType` |
| Brand | `brand` |
| Model | `model` |
| Status Type | `statusType` |
| Current Status | `currentStatus` |
| Technician | `technician.name` |
| Created By | `createdBy.name` |
| Delivery Date | `deliveryDate` |
| Estimated Price | `estimatedPrice` |

---

### **Field Deep Dives**

##### **Acceptance Number Details** {#acceptance-number-details}
* **Data Source:** Auto-generated by the backend upon creation.
* **Behavior:** It is a unique identifier. It is not editable by the user. In list views, it is the primary link to the `Edit` page for that job.
* **AI Context/Suggestions:** The backend must ensure uniqueness. The format `XXXXX-YYYY` suggests a sequential number combined with the year.

##### **Customer Details** {#customer-details}
* **Data Source:** The dropdown is populated from the master `Customer` data table.
* **Behavior:** This is an autocomplete field. Typing should filter the list by name and phone number.
* **Action (`+` Button):** Clicking the `+` icon must open the 'Add New Customer' modal. After creation, the new customer should be automatically selected.
* **AI Context/Suggestions:** The component should be optimized for a large customer list (10,000+). Implement server-side searching or lazy-loading for performance.

##### **Created Date Details** {#created-date-details}
* **Data Source:** Set automatically by the backend to the current timestamp when a new record is created.
* **Behavior:** On the `Add` form, it can be pre-filled but should be user-editable. On the `Edit` form, this field is read-only.
* **AI Context/Suggestions:** Backend should store all timestamps in UTC. Frontend should convert to the user's local timezone for display.

##### **IMEI / Serial No Details** {#imei-serial-no-details}
* **Data Source:** User input.
* **Behavior:** The system should perform a quick background check for duplicate active jobs with the same IMEI.
* **Action (`i` Button):** In the "Edit" view, an info icon appears. This should open a modal showing the history of all previous repairs associated with this IMEI.
* **AI Context/Suggestions:** Validation should allow for 15-digit IMEIs and variable-length alphanumeric serials. The backend must handle the uniqueness check logic.

##### **Pin Unlock Details** {#pin-unlock-details}
* **Behavior:** This is a "Yes/No" radio button.
* **Action:** If "Yes" is selected, a new text input field for the "Pin Unlock Number" must appear. If "No" is selected, the text input must be hidden.
* **AI Context/Suggestions:** The form logic should conditionally render the text input based on the radio button's state. The pin/password should be stored securely on the backend.

##### **Urgent Details** {#urgent-details}
* **Behavior:** This is a "Yes/No" radio button.
* **Action:** If "Yes" is selected, a new DateTime Picker field for the "Urgent Date" must appear.
* **AI Context/Suggestions:** Jobs flagged as "Urgent" should be highlighted on the main dashboard and list views. The system could generate notifications if the urgent date is approaching.

##### **Work Progress Notes Details** {#work-progress-notes-details}
* **Behavior:** This field should function as a log. New notes should be appended with a timestamp and the user's name, rather than overwriting old notes.
* **AI Context/Suggestions:** Implement this as a related table in the database (`job_notes`) linked to the main `jobs` table, with columns for `job_id`, `user_id`, `note_text`, and `created_at`. The frontend should display these notes in chronological order.

##### **Spare Parts Used Details** {#spare-parts-used-details}
* **Behavior:** A dynamic field array where a user can search for a product from inventory, select a quantity, and add it to a list within the form. The component displays a running total of the cost of all added parts.
* **AI Context/Suggestions:** This is a critical feature. When a repair job's status is changed to "Completed", the quantities of the spare parts used must be automatically deducted from the inventory `stock` count. This requires a transactional update on the backend to ensure data integrity.

##### **Delivery Date Details** {#delivery-date-details}
* **Behavior:** Records when the customer picks up the device.
* **AI Context/Suggestions:** The system should offer to automatically populate this field with the current date and time when the `Current Status` is changed to "Completed" or "Delivered".

##### **Payment Method Details** {#payment-method-details}
* **Behavior:** These fields are part of completing the financial transaction for the repair.
* **AI Context/Suggestions:** This data must create a corresponding entry in a financial `transactions` table, linking back to this `job_id`. This connects the repair module to the accounting/ledger module.

</details>
<details>
<summary><h3>4.2 Sales Management</h3></summary>

This section contains all requirements for processing sales transactions. The system must support two distinct types of sales: a comprehensive, inventory-linked Point of Sale (POS) system and a simple form for general, non-inventory sales.

#### **Master Fields & Business Rules**
This consolidated view helps with database design by listing all fields related to sales transactions.

**Master Field Table**

| Field Name | Data Type | Appears On | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| **[Customer](#sale-customer-details)** | Reference (Customer ID) | `[Inventory Sale]`, `[Sales History]` | The customer making the purchase. Required. Defaults to a "Walk-in Customer". |
| **[Items (Sales Cart)](#sales-cart-details)** | Array of Objects | `[Inventory Sale]` | A list of products from inventory being sold. |
| **[Product (Manual Entry)](#general-sale-details)**| String | `[General Sale]` | Manually entered product name for a non-inventory sale. |
| **[Purchase Price (Manual)](#general-sale-details)**| Number | `[General Sale]` | Manually entered cost of the item for a general sale to calculate profit. |
| **[Order Summary](#order-summary-details)** | Calculation Block | `[Inventory Sale]` | Displays totals, discounts, VAT, and the final amount to be paid. |
| [Payment Method](#) | String | `[Inventory Sale]`, `[General Sale]` | Method of payment (e.g., "Cash", "Card"). Required. |
| [Paid Amount](#) | Number | `[Inventory Sale]`, `[General Sale]` | The amount paid by the customer. Required. |
| [Order Note](#) | Text | `[Inventory Sale]` | Optional notes related to the entire order. |
| [Branch](#) | String (Reference) | `[General Sale]` | The branch where the sale is being made. |
| [Date](#) | DateTime | `[Sales History]` | The timestamp of the sale transaction. |

**Common Business Rules:**
- All sales must generate an immutable transaction record for accounting purposes.
- Inventory-linked sales **must** automatically deduct the sold quantity from the `Product` stock upon completion.
- The system must handle VAT calculations (e.g., +22%) for all inventory-linked sales.
- Profit for each sale should be calculated and stored. For inventory sales, it's `(Sale Price - Purchase Price) * Quantity`. For general sales, both prices are entered manually.

---
### **Page-Specific Views**
These sections show the exact fields and layout for each individual page for easy verification.

* [Go to New Inventory Sale Page Details](#new-inventory-sale-page)
* [Go to New General Sale Page Details](#new-general-sale-page)
* [Go to Sales History Page Details](#sales-history-page)

---
<br>

#### **New Inventory Sale Page Details** {#new-inventory-sale-page}
* **Purpose:** A comprehensive Point of Sale (POS) interface for selling products directly from the inventory.
* **Page URL:** `/sales/new`
* **Layout:** This page has a two-column layout.
    * **Left Column (Product Selection & Cart):** Contains a product search bar and the list of items added to the cart.
    * **Right Column (Order & Payment):** Contains customer selection, order summary, and payment fields.

* **Components & Fields:**
    * **Product Search Bar:** An autocomplete field to search and select products from the inventory.
    * **Sales Cart Table:** A table displaying added items with columns for `Product`, `Price`, `Quantity`, `Subtotal`, and `Action (Remove)`.
    * **Order Summary Panel:** A panel on the right with the following fields:
        * `Customer Name` (Searchable Dropdown, Required)
        * `Order Total` (Read-only)
        * `Order Total (+22%)` (Read-only, Required)
        * `Discount Type` (Radio: Amount / Percent %)
        * `Discount` (Text Input)
        * `Discounted Amount` (Read-only)
        * `To Pay` (Read-only, Required)
        * `Paid` (Text Input, Required)
        * `Payment Method` (Dropdown, Required)
        * `Payment Receipt Number` (Text Input)
        * `Order Note` (Text Area)
    * **Action Buttons:** `Complete Sale`.

<br>

#### **New General Sale Page Details** {#new-general-sale-page}
* **Purpose:** A simple form for quickly logging miscellaneous sales of items not tracked in the inventory.
* **Page URL:** `/sales/general`
* **Fields on this Page:**

| Field Label | Field Type | Required |
| :--- | :--- | :--- |
| Client | Text Input | No |
| Product | Text Input | Yes |
| Branch | Dropdown | Yes |
| Paid Amount | Number Input | Yes |
| Purchase Price| Number Input | Yes |
| Payment Method| Dropdown | Yes |

* **Action Buttons:** `Save`, `Reset`, `Khata`.

<br>

#### **Sales History Page Details** {#sales-history-page}
* **Purpose:** To view a list of all past sales transactions.
* **Page URL:** `/sales`
* **Search Fields:** (Basic filtering should be available)
    * Date Range (From / To)
    * Customer
    * Branch
* **Table Columns:**

| Column Header | Data Source Field |
| :--- | :--- |
| Sale ID | `id` |
| Date | `date` |
| Customer ID | `customerId` |
| Items | `items.length` (count of items) |
| Total Amount | `totalAmount` |
| Payment Method | `paymentMethod` |

---

### **Field Deep Dives**

##### **Customer (Sales) Details** {#sale-customer-details}
* **Data Source:** The dropdown is populated from the master `Customer` data table. A default "Walk-in Customer" option should be available and selected by default.
* **Action (`+` Button):** Clicking the `+` icon opens the 'Add New Customer' modal.
* **AI Context & Suggestions:** For reporting, it's crucial to link every sale to a customer, even a generic one. This allows for tracking customer purchase history and value.

##### **Items (Sales Cart) Details** {#sales-cart-details}
* **Behavior:** This is a dynamic list of items. A user searches for a product in the `ProductSearchInput`, and on selection, the item is added to this cart.
* **Functionality:**
    1.  **Add:** If a product is added that already exists in the cart, its quantity should be incremented.
    2.  **Update Quantity:** The quantity for each item can be changed directly in the cart table.
    3.  **Remove:** Each item has a remove button.
    4.  **Calculation:** Each row calculates its own subtotal (`Price * Quantity`).
* **AI Context & Suggestions:** This state should be managed globally (e.g., with Zustand). The component should read from this global store. Actions like adding, updating, or removing items will call functions defined in the store. When the sale is complete or canceled, the `clearCart` function must be called.

##### **Order Summary & Calculations Details** {#order-summary-details}
* **Behavior:** This panel dynamically updates as the `Sales Cart` changes.
* **Calculation Logic:**
    1.  `Order Total` = Sum of all `(item.salePrice * item.quantity)` in the cart.
    2.  `Order Total (+22%)` = `Order Total` * 1.22.
    3.  `Discounted Amount` = Calculated based on the `Discount Type` (fixed amount or percentage of the total).
    4.  `To Pay` = `Order Total (+22%)` - `Discounted Amount`.
* **AI Context & Suggestions:** All financial calculations should be handled carefully to avoid floating-point inaccuracies, preferably by working with integers (cents) on the backend. The frontend can display the decimal values. The VAT percentage (22%) should be a configurable value in the system settings.

##### **General Sale Fields Details** {#general-sale-details}
* **Behavior:** These fields (`Product`, `Purchase Price`, `Paid Amount`) are all manual user inputs.
* **Purpose:** The primary purpose is to quickly log a transaction and calculate its profit on the spot without needing a pre-existing inventory item.
* **AI Context & Suggestions:** While this offers flexibility, it creates inconsistent data (`Product` name can have typos). The new system should encourage using the inventory-linked sale where possible. Data from "General Sales" should be clearly marked as such in reporting to distinguish it from inventory-tracked sales. The `Khata` button suggests a direct link to a ledger or daily transaction view.

</details>

<details>
<summary><h3>4.3 Inventory & Product Management</h3></summary>

This section defines the requirements for managing the product catalog and inventory stock levels. This module is the single source of truth for all sellable items and spare parts.

#### **Master Fields & Business Rules**
This consolidated view lists all possible attributes of a product to facilitate database design and backend development.

**Master Field Table**

| Field Name | Data Type | Appears On | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| **[Product Name](#product-name-details)** | String | `[List]`, `[Add]`, `[Edit]` | The primary display name of the product. Required. |
| **[SKU](#sku-details)** | String | `[List]`, `[Add]`, `[Edit]` | Unique Stock Keeping Unit. Auto-generated on creation, read-only. |
| [Product Category](#) | String (Reference) | `[List]`, `[Add]`, `[Edit]` | The primary category of the product (e.g., "Spare Parts"). Required. |
| [Is Solid Device](#) | Boolean | `[Add]`, `[Edit]` | A flag, likely to distinguish complete devices (like phones) from parts. |
| [IMEI Number](#) | String | `[Add]`, `[Edit]` | For "Solid Devices" that have a unique IMEI. |
| **[Pricing Fields](#pricing-details)** | Number (Currency) | `[List]`, `[Add]`, `[Edit]` | Includes Purchase, Desktop, and Online prices. All are required. |
| [Box Number](#) | String (Reference) | `[Add]`, `[Edit]` | The physical storage location/bin for the product. |
| [Color](#) | String (Reference) | `[Add]`, `[Edit]` | The color of the product. |
| **[Stock](#stock-details)** | Integer | `[List]`, `[Add]`, `[Edit]` | The current available quantity in inventory. Required. |
| [Product Images](#) | Array of Files | `[Add]`, `[Edit]` | Media files (images) for the product. |
| **[Compatible Models](#compatible-models-details)**| Array of Strings | `[Add]`, `[Edit]` | A list of device models this product is compatible with. |
| [Product Description](#) | Text | `[Add]`, `[Edit]` | Detailed description for the product page. |
| [Product Brand](#) | String (Reference) | `[List]`, `[Add]`, `[Edit]` | The brand of the product (e.g., Apple, Samsung). Required. |
| [Product Model](#) | String (Reference) | `[Add]`, `[Edit]` | The specific model of the product. |
| [Product Condition](#) | String | `[Add]`, `[Edit]` | The condition of the product (e.g., "New", "Used", "Refurbished"). |
| **[Product Meta](#product-meta-details)** | Array of Strings | `[Add]`, `[Edit]` | Marketing tags for display on an e-commerce site. |
| [Product Tags](#) | Array of Strings | `[Add]`, `[Edit]` | Searchable keywords associated with the product. |

**Common Business Rules:**
- Every product must have a unique, system-generated SKU.
- Stock levels must be automatically decreased when an item is sold via an Inventory-Linked Sale.
- Stock levels must be automatically decreased when a `Spare Part` is used in a completed `Repair Job`.
- The `Product Model` dropdown options should be filtered based on the selected `Product Brand`.

---
### **Page-Specific Views**
These sections show the exact fields for each page for easy verification.

* [Go to Product List Page Details](#product-list-page)
* [Go to Add Product Page Details](#add-product-page)
* [Go to Edit Product Page Details](#edit-product-page)

---
<br>

#### **Product List Page Details** {#product-list-page}
* **Purpose:** To view, search, and filter all products in the inventory.
* **Page URL:** `/inventory`
* **Search Fields:**
    - Product Name / SKU
    - Product Category
    - Brand
    - Stock Level (e.g., "In Stock", "Out of Stock")
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | SKU | `sku` |
    | Product Name | `name` |
    | Category | `category` |
    | Stock | `stock` |
    | Purchase Price| `purchasePrice` |
    | Desktop Price | `desktopPrice` |

<br>

#### **Add Product Page Details** {#add-product-page}
* **Purpose:** To add a new product to the inventory.
* **Page URL:** `/inventory/new`
* **Fields on this Page:**

| Field Label | Field Type | Required |
| :--- | :--- | :--- |
| Product | Text Input | Yes |
| SKU | Text Input (Read-only)| N/A |
| Product Category | Dropdown | Yes |
| Is Solid Device | Dropdown (Yes/No) | Yes |
| IMEI Number | Text Input | No |
| Purchase Price | Number Input | Yes |
| Desktop Price | Number Input | Yes |
| Online Price | Number Input | Yes |
| Box Number | Dropdown | No |
| Color | Dropdown | No |
| Stock | Number Input | Yes |
| Product Images | File Upload | No |
| Compatible Models | Autocomplete Tag Input| No |
| Product Description | Text Area | No |
| Product Brand | Dropdown | Yes |
| Product Model | Dropdown | No |
| Product Condition| Dropdown | No |
| Product Meta | Checkboxes | No |
| Product Tags | Autocomplete Tag Input| No |

<br>

#### **Edit Product Page Details** {#edit-product-page}
* **Purpose:** To edit an existing product's details.
* **Page URL:** `/inventory/:id`
* **Fields on this Page:** The fields are identical to the "Add Product Page" but are pre-populated with the existing product's data. The `SKU` field remains read-only.

---

### **Field Deep Dives**

##### **Product Name Details** {#product-name-details}
* **Behavior:** The primary, human-readable name of the item. This is what will be displayed in the sales cart and on invoices.
* **AI Context & Suggestions:** This field should be indexed for fast text-based searching in the `ProductSearchInput` component. It's the main identifier for staff.

##### **SKU (Stock Keeping Unit) Details** {#sku-details}
* **Behavior:** A unique, internal-use code for the product. It must be auto-generated by the system upon product creation and must not be editable.
* **AI Context & Suggestions:** The backend must enforce a unique constraint on this field in the database. A good generation strategy could be based on the product category and a sequential number (e.g., `RIC-1001`, `ACC-2034`). This code is ideal for barcode integration.

##### **Pricing Fields Details** {#pricing-details}
* **`Purchase Price`:** The cost of acquiring the product from a supplier. This is crucial for profit calculation.
* **`Desktop Price`:** The standard selling price for in-store (POS) sales.
* **`Online Price`:** The selling price for the e-commerce website, which can be different from the in-store price.
* **AI Context & Suggestions:** The system must track the history of price changes, especially the purchase price, to allow for accurate profit reporting over time (e.g., using FIFO - First-In, First-Out costing).

##### **Stock Details** {#stock-details}
* **Behavior:** Represents the current on-hand quantity of the product.
* **AI Context & Suggestions:** This is the most critical field for inventory management. It must be updated by multiple system events in a transactional manner to prevent race conditions:
    - **DECREASED** when an inventory-linked sale is completed.
    - **DECREASED** when a spare part is used in a completed repair.
    - **INCREASED** when a product purchase from a supplier is logged.
    - **INCREASED** when a customer returns a sold item.
    The system should also have a feature for manual stock adjustments (stock-taking) with a reason log.

##### **Compatible Models Details** {#compatible-models-details}
* **Behavior:** An autocomplete tag-style input that allows associating a single product (like a screen or battery) with multiple device models.
* **Data Source:** The list of available models to tag should come from the master `Device Model` data table.
* **AI Context & Suggestions:** This creates a many-to-many relationship between Products and Device Models. This relationship is key to building a powerful search feature for spare parts (e.g., "Show me all screens for iPhone 14 Pro").

##### **Product Meta Details** {#product-meta-details}
* **Behavior:** A set of checkboxes (`Latest Product`, `Top Selling Product`, `Offer`).
* **Purpose:** These are primarily for marketing and display logic on a potential public-facing e-commerce website.
* **AI Context & Suggestions:** These flags can be used to automate the population of special sections on a website, like a "New Arrivals" or "Popular Items" page. The `Top Selling` flag could be automatically set by the system based on sales data over a certain period.

</details>

<details>
<summary><h3>4.4 People Management</h3></summary>

This section defines the requirements for managing all people and organizations interacting with the system, including customers, suppliers, and internal users (employees).

#### **Master Data Models & Rules**
This consolidated view describes the data structures for each type of entity.

**Master Data Table: Customer**
| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the customer. |
| `name` | String | Yes | Full name of the customer. |
| `phone`| String | Yes | Primary contact phone number. |
| `email`| String | No | Optional email address. |

**Master Data Table: Supplier**
| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the supplier. |
| `name` | String | Yes | Name of the supplier company. |
| `contactPerson`| String | No | Name of the primary contact at the company. |
| `phone`| String | Yes | Primary contact phone number. |
| `email`| String | No | Optional email address. |

**Master Data Table: User (Employee)**
| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the user. |
| `name` | String | Yes | Full name of the user. |
| `branch`| String | Yes | The branch the user is assigned to. |
| **[Roles](#user-roles-details)**| Array of Strings | Yes | List of roles defining the user's permissions. |

**Common Business Rules:**
- The system should prevent the creation of duplicate customers or suppliers based on phone number or email.
- Each list page should have a prominent "Add New" button to navigate to a creation form/modal.
- Each item in a list should be clickable, navigating to a detailed "Edit" page for that item.

---
### **Page-Specific Views**
These sections show the expected layout for each list page.

* [Go to Customer List Page Details](#customer-list-page)
* [Go to Supplier List Page Details](#supplier-list-page)
* [Go to User List Page Details](#user-list-page)

---
<br>

#### **Customer List Page Details** {#customer-list-page}
* **Purpose:** To view, search, and manage all customers.
* **Page URL:** `/people/customers`
* **Search Fields:**
    - Name
    - Phone Number
    - Email
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | Name | `name` |
    | Phone | `phone` |
    | Email | `email` |
    | Actions | (Edit, Delete buttons) |

<br>

#### **Supplier List Page Details** {#supplier-list-page}
* **Purpose:** To view, search, and manage all product suppliers.
* **Page URL:** `/people/suppliers`
* **Search Fields:**
    - Supplier Name
    - Contact Person
    - Phone Number
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | Supplier Name | `name` |
    | Contact Person| `contactPerson` |
    | Phone | `phone` |
    | Email | `email` |
    | Actions | (Edit, Delete buttons) |

<br>

#### **User List Page Details** {#user-list-page}
* **Purpose:** To view and manage all system users (employees).
* **Page URL:** `/people/users`
* **Search Fields:**
    - User Name
    - Branch
    - Role
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | Name | `name` |
    | Branch | `branch` |
    | Roles | `roles` |
    | Actions | (Edit, Delete buttons) |

---

### **Field Deep Dives**

##### **User Roles Details** {#user-roles-details}
* **Behavior:** A user can be assigned one or more roles. These roles dictate what pages they can see and what actions they can perform.
* **AI Context & Suggestions:** This is the core of the system's access control (permissions). The backend must protect every API endpoint based on the logged-in user's roles. For example, a `Technician` should not be able to access an API endpoint for creating a new `Product`. This is known as Role-Based Access Control (RBAC). The list of available roles should be manageable by an `Administrator`.

</details>

<details>
<summary><h3>4.5 Expenses Management</h3></summary>

This section defines the requirements for logging and tracking general business expenses that are not direct product purchases, such as rent, utilities, or salaries.

#### **Master Fields & Business Rules**
This consolidated view lists all fields related to an expense record.

**Master Field Table**

| Field Name | Data Type | Appears On | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | `[List]` | Unique identifier for the expense record. |
| `date` | Date | `[List]`, `[Add/Edit]`| The date the expense was incurred. Required. |
| `description` | String | `[List]`, `[Add/Edit]`| A clear description of the expense. Required. |
| **[Category](#expense-category-details)** | String | `[List]`, `[Add/Edit]`| The category of the expense (e.g., "Rent", "Utilities"). Required. |
| `amount` | Number | `[List]`, `[Add/Edit]`| The monetary value of the expense. Required. |

**Common Business Rules:**
- All expenses must be recorded against a specific date.
- The system should allow for reporting on expenses based on a date range and category.
- Access to view and manage expenses should be restricted to `Manager` and `Administrator` roles.

---
### **Page-Specific Views**
These sections show the expected layout for each expenses-related page.

* [Go to Add Expense Page Details](#add-expense-page)
* [Go to Expense List Page Details](#expense-list-page)

---
<br>

#### **Add Expense Page Details** {#add-expense-page}
* **Purpose:** To log a new general expense.
* **Page URL:** `/expenses/new`
* **Fields on this Page:**

| Field Label | Field Type | Required |
| :--- | :--- | :--- |
| Description | Text Input | Yes |
| Category | Text Input / Dropdown| Yes |
| Amount (€) | Number Input | Yes |
| Date | Date Picker | Yes |

<br>

#### **Expense List Page Details** {#expense-list-page}
* **Purpose:** To view a history of all logged general expenses.
* **Page URL:** `/expenses`
* **Search Fields:**
    - Date Range (From / To)
    - Category
* **Table Columns:**

| Column Header | Data Source Field |
| :--- | :--- |
| Date | `date` |
| Description | `description` |
| Category | `category` |
| Amount | `amount` |
| Actions | (Edit, Delete buttons) |

---

### **Field Deep Dives**

##### **Category Details** {#expense-category-details}
* **Behavior:** Classifies the expense for reporting purposes.
* **AI Context & Suggestions:** To ensure data consistency for accurate reporting, this field should not be a free-text input. Instead, it should be a dropdown (`SearchableDropdown`) populated from a manageable list of categories defined in the **System Settings**. This prevents variations like "Utilities", "Utility", and "Bills" for the same expense type.

</details>

<details>
<summary><h3>4.6 System Settings</h3></summary>

This section defines the administrative area of the application, where core data and system behaviors are managed. Access to this module should be restricted to `Administrator` roles.

#### **Master View: Manageable Entities**
Unlike other modules, the Settings area is a collection of tools for managing the data that populates dropdowns and lists throughout the application. The key manageable entities are:

* **Branches:** Physical shop locations.
* **Device Brands & Models:** The master list of manufacturers and their device models.
* **Repair Statuses:** The customizable workflow steps for a repair job (e.g., "In Repair", "Waiting for Part", "Completed").
* **Expense Categories:** The list of categories for logging expenses (e.g., "Rent", "Utilities").
* **Payment Methods:** The list of accepted payment methods (e.g., "Cash", "Card").
* **User Roles & Permissions:** Management of user roles and what each role can do.

**Common Business Rules:**
- Any changes made in the settings must be reflected in real-time across the entire application. For example, adding a new `Branch` should make it immediately available in the `Repair Form` dropdown.
- Deleting an item that is currently in use (e.g., a `Repair Status` applied to an active job) should be prevented or handled with a clear warning and migration path.

---
### **Page-Specific Views**
These sections describe the main pages within the Settings module.

* [Go to Main Settings Page Details](#main-settings-page)
* [Go to Branches Management Page Details](#branches-management-page)
* [Go to Device Models Management Page Details](#device-models-management-page)

---
<br>

#### **Main Settings Page Details** {#main-settings-page}
* **Purpose:** To act as a central dashboard or hub for all administrative settings.
* **Page URL:** `/settings`
* **Functionality:** This page will display a list or a grid of cards, with each item linking to a specific management page (e.g., a card for "Manage Branches", a card for "Manage Device Models", etc.).

<br>

#### **Branches Management Page Details** {#branches-management-page}
* **Purpose:** To create, view, update, and delete shop locations/branches.
* **Page URL:** `/settings/branches`
* **Functionality:** A standard CRUD (Create, Read, Update, Delete) interface.
    * A `DataTable` will list all existing branches with columns for `Branch Name` and `Address`.
    * An "Add New Branch" button will open a modal or navigate to a form for creating a new branch.
    * Each row in the table will have "Edit" and "Delete" action buttons.

<br>

#### **Device Models Management Page Details** {#device-models-management-page}
* **Purpose:** To manage the master list of Brands and their associated Models.
* **Page URL:** `/settings/device-models`
* **Functionality:** This page should have a two-panel layout to manage the one-to-many relationship between Brands and Models.
    * **Panel 1 (Brands):** A list of all `Brands` (e.g., "Apple", "Samsung"). This list will have "Add", "Edit", and "Delete" functionality.
    * **Panel 2 (Models):** When a brand is selected in the first panel, this panel shows a `DataTable` of all `Models` associated with that brand. This table will also have "Add", "Edit", and "Delete" functionality.

</details>

---

## 5. Navigation & Routing

This final section outlines the application's menu structure and the corresponding URL routes.

### 5.1 Main Menu Structure
This is the complete, hierarchical navigation structure that should be present in the main sidebar.

- **Dashboard**
- **Repair Management (Acceptance)**
    - Add New Repair
    - Search Repairs
- **Sales**
    - New Inventory Sale
    - New General Sale
    - Sales History
- **Inventory**
    - Add New Product
    - Product List
- **Expenses**
    - Add Expense
    - Expense List
- **People**
    - Customers
    - Suppliers
    - Users
- **Settings**
    - Branches
    - Device Models

### 5.2 Application Routes (URLs)
This table maps the application URLs to their corresponding pages.

| URL Path | Page / Component | Description |
| :--- | :--- | :--- |
| `/login` | `LoginPage` | User login screen. |
| `/dashboard` (or `/`) | `DashboardPage` | Main dashboard with summary metrics. |
| `/repairs` | `RepairListPage` | List and search for all repair jobs. |
| `/repairs/new` | `AddRepairPage` | Form to create a new repair job. |
| `/repairs/:id` | `EditRepairPage` | Form to edit an existing repair job. |
| `/sales` | `SalesHistoryPage` | List of all past sales transactions. |
| `/sales/new` | `NewSalePage` | POS interface for inventory-linked sales. |
| `/sales/general` | `GeneralSalePage` | Form for simple, non-inventory sales. |
| `/inventory` | `ProductListPage` | List and search for all inventory products. |
| `/inventory/new` | `AddProductPage` | Form to create a new product. |
| `/inventory/:id` | `EditProductPage` | Form to edit an existing product. |
| `/people/customers`| `CustomerListPage` | List of all customers. |
| `/people/suppliers`| `SupplierListPage` | List of all suppliers. |
| `/people/users`| `UserListPage` | List of all system users. |
| `/expenses` | `ExpenseListPage` | List of all general expenses. |
| `/expenses/new` | `AddExpensePage` | Form to create a new expense. |
| `/settings` | `SettingsPage` | Central hub for all settings pages. |
| `/settings/branches` | `BranchesPage` | Page to manage shop branches. |
| `/settings/device-models` | `DeviceModelsPage`| Page to manage brands and models. |


<details>
<summary><h3>4.5 Expenses Management</h3></summary>

This section defines the requirements for logging and tracking all business expenses. It covers both general expenses (like rent) and direct product purchases from suppliers.

#### **Master Fields & Business Rules**
This consolidated view lists all fields related to expense and purchase records.

**Master Field Table: General Expense**
| Field Name | Data Type | Appears On | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | `[List]` | Unique identifier for the expense record. |
| `date` | Date | `[List]`, `[Add/Edit]`| The date the expense was incurred. Required. |
| `description` | String | `[List]`, `[Add/Edit]`| A clear description of the expense. Required. |
| **[Category](#expense-category-details)** | String | `[List]`, `[Add/Edit]`| The category of the expense (e.g., "Rent", "Utilities"). Required. |
| `amount` | Number | `[List]`, `[Add/Edit]`| The monetary value of the expense. Required. |

**Master Field Table: Product Purchase**
| Field Name | Data Type | Appears On | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | `[List]` | Unique identifier for the purchase record. |
| `supplierId` | String (Reference) | `[Add/Edit]` | The ID of the `Supplier`. Required. |
| `invoiceNumber`| String | `[List]`, `[Add/Edit]`| The supplier's invoice number. Required. |
| `invoiceDate` | Date | `[Add/Edit]` | The date on the supplier's invoice. Required. |
| `paymentDate` | Date | `[Add/Edit]` | The date the payment was made to the supplier. Required. |
| `items` | Array of Objects | `[Add/Edit]` | A list of products being purchased. |
| `purchaseTotal`| Number | `[Add/Edit]` | The subtotal of all items before discount. Required. |
| `discount` | Number | `[Add/Edit]` | The discount amount received from the supplier. |
| `toPay` | Number | `[Add/Edit]` | The final amount to be paid after discount. Required. |
| `paid` | Number | `[Add/Edit]` | The actual amount paid in this transaction. Required. |
| `paymentMethod`| String | `[Add/Edit]` | How the supplier was paid. Required. |
| `paymentReceiptNumber`| String | `[Add/Edit]` | Optional reference for the payment. |
| `orderNote` | Text | `[Add/Edit]` | Optional notes for the entire purchase order. |

**Common Business Rules:**
- A **Product Purchase** is a critical transaction. When a new purchase is saved, the system **must automatically increase the `stock` quantity** for each product listed in the purchase.
- The `Purchase Price`, `Desktop Price`, and `Online Price` of a `Product` should be updatable from the "Add Product Purchase" form.

---
### **Page-Specific Views**
These sections show the expected layout for each expenses-related page.

* [Go to Add Product Purchase Page Details](#add-product-purchase-page)
* [Go to Product Purchase List Page Details](#product-purchase-list-page)
* [Go to Add General Expense Page Details](#add-expense-page)
* [Go to General Expense List Page Details](#expense-list-page)

---
<br>

#### **Add Product Purchase Page Details** {#add-product-purchase-page}
* **Purpose:** To record the purchase of new inventory from a supplier and update stock levels.
* **Page URL:** `/purchases/new`
* **Layout:** This page has a two-column layout.
    * **Left Column (Product Entry & Cart):** For searching and adding products to the purchase invoice.
    * **Right Column (Invoice & Payment Details):** For managing supplier, invoice, and payment information.

* **Components & Fields:**
    * **Product Entry Section (Left):**
        * `Product` (Searchable Autocomplete)
        * `Quantity`, `Purchase Price`, `Desktop Price`, `Online Price` (Inputs for the new purchase)
        * `Available Quantity`, `Purchase Price`, `Online Price`, `Desktop Price` (Read-only fields showing current product data)
        * `Add Product` Button
    * **Purchase Cart Section (Left, below entry):** A table listing all products added to the invoice, with columns for Product, Quantity, Price, and Actions (Remove).
    * **Invoice Details Section (Right):**
        * `Supplier` (Searchable Dropdown, Required, `+` Button)
        * `Invoice Number` (Text Input, Required)
        * `Invoice Date` (Date Picker, Required)
        * `Payment Date` (Date Picker, Required)
    * **Payment Section (Right):**
        * `Purchase Total` (Read-only, calculated from cart)
        * `Discount` (Number Input)
        * `To Pay` (Read-only, calculated)
        * `Paid` (Number Input, Required)
        * `Payment Method` (Dropdown, Required, `+` Button)
        * `Payment Receipt Number` (Text Input)
        * `Order Note` (Text Area)
    * **Action Buttons:** `Save`, `Reset`.

<br>

#### **Product Purchase List Page Details** {#product-purchase-list-page}
* **Purpose:** To view a history of all purchase orders from suppliers.
* **Page URL:** `/purchases`
* **Table Columns:** `Invoice Number`, `Supplier`, `Invoice Date`, `Total Amount`, `Paid Amount`.

<br>

#### **Add General Expense Page Details** {#add-expense-page}
* **Purpose:** To log a new general expense.
* **Page URL:** `/expenses/new`
* **Fields on this Page:**

| Field Label | Field Type | Required |
| :--- | :--- | :--- |
| Description | Text Input | Yes |
| Category | Dropdown/Text Input| Yes |
| Amount (€) | Number Input | Yes |
| Date | Date Picker | Yes |

<br>

#### **General Expense List Page Details** {#expense-list-page}
* **Purpose:** To view a history of all logged general expenses.
* **Page URL:** `/expenses`
* **Search Fields:** Date Range, Category.
* **Table Columns:** `Date`, `Description`, `Category`, `Amount`.

---

### **Field Deep Dives**

##### **Category Details (Expense)** {#expense-category-details}
* **Behavior:** Classifies the expense for reporting purposes.
* **AI Context & Suggestions:** This should be a dropdown populated from a manageable list of categories in **System Settings** to ensure data consistency for accurate reporting.

</details>




<details>
<summary><h3>4.6 System Settings</h3></summary>

This section defines the administrative area of the application, where core data and system behaviors are managed. Access to this module should be restricted to `Administrator` roles.

#### **Master View: Manageable Entities**
Unlike other modules, the Settings area is a collection of tools for managing the data that populates dropdowns and lists throughout the application. The key manageable entities are:

* **Branches:** Physical shop locations.
* **Device Brands & Models:** The master list of manufacturers and their device models.
* **Repair Statuses:** The customizable workflow steps for a repair job (e.g., "In Repair", "Waiting for Part", "Completed").
* **Expense Categories:** The list of categories for logging expenses (e.g., "Rent", "Utilities").
* **Payment Methods:** The list of accepted payment methods (e.g., "Cash", "Card").
* **User Roles & Permissions:** Management of user roles and what each role can do.

**Common Business Rules:**
- Any changes made in the settings must be reflected in real-time across the entire application. For example, adding a new `Branch` should make it immediately available in the `Repair Form` dropdown.
- Deleting an item that is currently in use (e.g., a `Repair Status` applied to an active job) should be prevented or handled with a clear warning and migration path.

---
### **Page-Specific Views**
These sections describe the main pages within the Settings module.

* [Go to Main Settings Page Details](#main-settings-page)
* [Go to Branches Management Page Details](#branches-management-page)
* [Go to Device Models Management Page Details](#device-models-management-page)

---
<br>

#### **Main Settings Page Details** {#main-settings-page}
* **Purpose:** To act as a central dashboard or hub for all administrative settings.
* **Page URL:** `/settings`
* **Functionality:** This page will display a list or a grid of cards, with each item linking to a specific management page (e.g., a card for "Manage Branches", a card for "Manage Device Models", etc.).

<br>

#### **Branches Management Page Details** {#branches-management-page}
* **Purpose:** To create, view, update, and delete shop locations/branches.
* **Page URL:** `/settings/branches`
* **Functionality:** A standard CRUD (Create, Read, Update, Delete) interface.
    * A `DataTable` will list all existing branches with columns for `Branch Name` and `Address`.
    * An "Add New Branch" button will open a modal or navigate to a form for creating a new branch.
    * Each row in the table will have "Edit" and "Delete" action buttons.

<br>

#### **Device Models Management Page Details** {#device-models-management-page}
* **Purpose:** To manage the master list of Brands and their associated Models.
* **Page URL:** `/settings/device-models`
* **Functionality:** This page should have a two-panel layout to manage the one-to-many relationship between Brands and Models.
    * **Panel 1 (Brands):** A list of all `Brands` (e.g., "Apple", "Samsung"). This list will have "Add", "Edit", and "Delete" functionality.
    * **Panel 2 (Models):** When a brand is selected in the first panel, this panel shows a `DataTable` of all `Models` associated with that brand. This table will also have "Add", "Edit", and "Delete" functionality.

</details>

<details>
<summary><h3>4.7 Managerial Tasks & Reporting</h3></summary>

This section covers high-level reporting and management tools, primarily for `Manager` and `Administrator` roles.

#### **Master Concepts & Business Rules**
* **Financial Aggregation:** The system must aggregate data from `Sales`, `Repairs`, `Expenses`, and `Product Purchases` to generate financial reports.
* **Data Scoping:** All reports must be filterable by `Branch` and a specific time period (`Date` or `Month`).
* **Profit vs. Cash Flow:** The system must distinguish between Profit (Revenue - Costs) and Cash Flow (Cash In - Cash Out).

---
### **Page-Specific Views**
* [Go to Khata Online (Online Ledger) Page Details](#khata-online-page)
---
<br>

#### **Khata Online (Online Ledger) Page Details** {#khata-online-page}
* **Purpose:** To provide a comprehensive daily or monthly financial summary (cash flow, profit/loss) for a selected branch. This acts as the main daybook/ledger for the business.
* **Page URL:** `/reports/khata`
* **Filters:**
    | Filter Name | Field Type | Required |
    | :--- | :--- | :--- |
    | Branch | Dropdown | Yes |
    | View Report By | Radio (Date / Month) | Yes |
    | Date | Date Picker | Yes (if "Date" is selected) |
    | Month | Month/Year Picker | Yes (if "Month" is selected)|

* **Main Report Table:** A detailed breakdown of all transactions for the selected period.
    | Column Header | Description | Data Source |
    | :--- | :--- | :--- |
    | Date | The date of the transactions. | Transaction `date` |
    | Contanti (Cash) | Total cash received. | `Sales`, `Repairs` payments |
    | Carta (Card) | Total card payments received. | `Sales`, `Repairs` payments |
    | Paypal | Total PayPal payments received. | `Sales`, `Repairs` payments |
    | Bonifico (Bank Transfer)| Total bank transfers received.| `Sales`, `Repairs` payments |
    | **Total - IN** | Sum of all incoming payments.| `Contanti` + `Carta` + `Paypal` + `Bonifico`|
    | Expense | Total general expenses. | `Expenses` module |
    | **Total - Out** | Total payments made to suppliers.| `Product Purchases` module |
    | **Profit / Loss** | Calculated profit for the day/month.| `(Total IN) - (Cost of Goods Sold) - (Expense)` |
    | **In Hand** | Net cash change for the day/month.| `(Cash IN) - (Cash OUT)` |

* **Summary Table (Footer):** Provides the grand totals for the entire selected period.
    | Column Header | Description |
    | :--- | :--- |
    | Total In | Grand total of all income. |
    | Total Out | Grand total of all supplier payments. |
    | Expense | Grand total of all general expenses. |
    | Profit/ Loss | Total net profit or loss. |
    | Cash in Hand | Final net cash position. |

---
### **Field Deep Dives**

##### **Total IN Calculation**
* **Behavior:** This column aggregates all revenue received from completed `Sales` and payments for `Repair Jobs` within the selected period. It is broken down by the `Payment Method` used for each transaction.
* **AI Context & Suggestions:** The backend needs to query multiple tables (`sales`, `repair_payments`) and group the results by date and payment method to generate this report accurately.

##### **Profit / Loss Calculation**
* **Behavior:** This shows the net profitability of the business.
* **AI Context & Suggestions:** This is a complex calculation that differs from cash flow. The correct formula is `Profit = (Revenue) - (Cost of Goods Sold) - (General Expenses)`.
    - **Revenue** is the `Total IN`.
    - **Cost of Goods Sold (COGS)** is the `purchasePrice` of the items sold or used in repairs, *not* the `Total Out` (which is cash paid to suppliers). To calculate this accurately, every `SaleItem` and `SparePart` used must have its original `purchasePrice` recorded at the time of the transaction.
    - **General Expenses** comes from the `Expenses` module.
    The current system's UI might be simplifying this, but a robust new system should calculate true profit.

##### **In Hand (Cash Flow) Calculation**
* **Behavior:** This metric tracks the net change in physical cash.
* **AI Context & Suggestions:** The formula is `Cash In Hand = (Total cash received from all sales/repairs) - (Total cash paid for General Expenses) - (Total cash paid for Product Purchases)`. This requires tracking the `paymentMethod` for all outgoing payments as well, a field that should be added to the `Expense` and `Product Purchase` modules. This metric is critical for day-to-day cash management.

</details>





<details>
<summary><h3>4.7 Managerial Tasks & Reporting</h3></summary>

This section covers high-level reporting and financial management tools, primarily for `Manager` and `Administrator` roles. This is the core of the system's accounting and business intelligence capabilities.

#### **Master Data Models & Rules**
This consolidated view describes the data structures for financial records.

**Master Data Table: Transaction**
* **AI Context:** This is one of the most important data models. A new `Transaction` record **must** be created automatically for every single financial event that occurs in the system, including:
    - A completed inventory sale (`Sale`)
    - A completed general sale
    - A payment received for a repair (`Job`)
    - A product purchase from a supplier (`Product Purchase`)
    - A general expense (`Expense`)

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the transaction. |
| `date` | DateTime | Yes | Timestamp of when the transaction occurred. |
| `type` | String | Yes | "Income" or "Expense". |
| `credit` | Number | No | The amount of money received (income). |
| `debit` | Number | No | The amount of money paid out (cost of goods). |
| `expense` | Number | No | The amount of a general expense (distinct from cost of goods). |
| `paymentMethod`| String | Yes | How the money was paid/received (e.g., "Cash", "Card"). |
| `referenceType`| String | Yes | The type of entity this transaction is linked to (e.g., "Sale", "Repair", "Purchase"). |
| `referenceId` | String | Yes | The ID of the linked entity (e.g., the `Sale` ID or `Job` ID). |
| `referenceDescription`| String | Yes | A human-readable description of the source (e.g., "Sale #22589"). |
| `customerId` | String (Reference)| No | The customer or supplier associated with the transaction. |
| `userId` | String (Reference)| Yes | The employee who recorded the transaction. |

**Common Business Rules:**
- The `Transaction` table is append-only. Records should never be deleted, only marked as voided or reversed through a counter-transaction to maintain a clean audit trail.
- All financial reports, including the "Khata Online" page, are generated by aggregating data from this master `Transaction` table.

---
### **Page-Specific Views**
* [Go to Transactions Page Details](#transactions-page)
* [Go to Khata Online (Online Ledger) Page Details](#khata-online-page)

---
<br>

#### **Transactions Page Details** {#transactions-page}
* **Purpose:** To provide a detailed, searchable log of every financial transaction (income and expense) across the business. This is the master financial ledger.
* **Page URL:** `/reports/transactions`
* **Search Fields:**
    | Field Name | Field Type |
    | :--- | :--- |
    | Transaction Type | Dropdown ("Income", "Expense") |
    | Transaction Reference | Dropdown ("Acceptance", "E-Commerce Order", etc.) |
    | Branch | Dropdown |
    | Date From / To | Date Picker |
    | Customer | Text Input |
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | Date | `date` |
    | Debit (Out) | `debit` |
    | Expense | `expense` |
    | Credit (In) | `credit` |
    | Payment Method| `paymentMethod` |
    | Reference | `referenceDescription` (with link to source) |
    | Customer | `customer.name` |
    | Saved By | `user.name` |
* **Summary Footer:** The page must display a summary of totals based on the filtered results, including Total In (by payment method), Total Purchase, Profit/Loss, and Cash Flow (Cash In - Cash Out).

<br>

#### **Khata Online (Online Ledger) Page Details** {#khata-online-page}
* **Purpose:** To provide a high-level daily or monthly financial summary of all transactions for a selected branch.
* **Page URL:** `/reports/khata`
* **Filters:**
    | Filter Name | Field Type | Required |
    | :--- | :--- | :--- |
    | Branch | Dropdown | Yes |
    | View Report By | Radio (Date / Month) | Yes |
    | Date | Date Picker | Yes (if "Date" is selected) |
    | Month | Month/Year Picker | Yes (if "Month" is selected)|
* **Main Report Table:** A daily breakdown of aggregated transactions for the selected period.
    | Column Header | Description |
    | :--- | :--- |
    | Date | The specific day. |
    | Contanti (Cash) | Total cash received. |
    | Carta (Card) | Total card payments received. |
    | Paypal / Bonifico | Totals for other payment methods. |
    | Total - IN | Sum of all incoming payments for that day. |
    | Expense | Total general expenses for that day. |
    | Total - Out | Total supplier payments for that day. |
    | Profit / Loss | Calculated profit for that day. |
    | In Hand | Net cash change for that day. |
* **Summary Table (Footer):** Provides the grand totals for the entire selected period (e.g., the whole month), matching the fields in the main report table.

</details>


## 4.7 Managerial Tasks & Reporting (Updated)

This section covers high-level reporting and financial management tools, primarily for `Manager` and `Administrator` roles. This is the core of the system's accounting and business intelligence capabilities.

#### **Master Data Models & Rules**
This consolidated view describes the data structures for financial records.

**Master Data Table: Transaction**
* **AI Context:** This is one of the most important data models. A new `Transaction` record **must** be created automatically for every single financial event in the system: a completed `Sale`, a `Repair` payment, a `Product Purchase`, a general `Expense`, and the purchase/sale of a `Tracked Device`.

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the transaction. |
| `date` | DateTime | Yes | Timestamp of when the transaction occurred. |
| `type` | String | Yes | "Income" or "Expense". |
| `credit` | Number | No | The amount of money received (income). |
| `debit` | Number | No | The cost of goods sold (COGS) for the transaction. |
| `expense` | Number | No | The amount of a general expense. |
| `paymentMethod`| String | Yes | How the money was paid/received (e.g., "Cash", "Card"). |
| `referenceType`| String | Yes | The source of the transaction (e.g., "Sale", "Repair", "Purchase"). |
| `referenceId` | String | Yes | The ID of the linked entity (e.g., the `Sale` ID or `Job` ID). |
| `referenceDescription`| String | Yes | A human-readable description of the source (e.g., "Sale #22589"). |
| `customerId` | String (Reference)| No | The customer or supplier associated with the transaction. |
| `userId` | String (Reference)| Yes | The employee who recorded the transaction. |

**Common Business Rules:**
- The `Transaction` table is append-only. Records should never be deleted, only marked as voided or reversed through a counter-transaction to maintain a clean audit trail.
- All financial reports, including the "Khata Online" page, are generated by aggregating data from this master `Transaction` table.

---
### **Page-Specific Views**
* [Go to Khata Online (Online Ledger) Page Details](#khata-online-page)
* [Go to Transactions Page Details](#transactions-page)

---
<br>

#### **Khata Online (Online Ledger) Page Details** {#khata-online-page}
* **Purpose:** To provide a high-level daily or monthly financial summary of all transactions for a selected branch.
* **Page URL:** `/reports/khata`
* **Filters:** Branch, View Report By (Date/Month), Date/Month Picker.
* **Main Report Table:** A daily breakdown of aggregated transactions.
    | Column Header | Description |
    | :--- | :--- |
    | Date | The specific day. |
    | Contanti (Cash) / Carta (Card) / etc. | Total income, broken down by payment method. |
    | Total - IN | Sum of all incoming payments for that day. |
    | Expense | Total general expenses for that day. |
    | Total - Out | Total supplier payments (product purchases) for that day. |
    | Profit / Loss | Calculated profit for that day `(Total IN - COGS - Expense)`. |
    | In Hand | Net cash change for that day. |
* **Summary Table (Footer):** Provides the grand totals for the entire selected period.

<br>

#### **Transactions Page Details** {#transactions-page}
* **Purpose:** To provide a detailed, searchable log of every individual financial transaction (income and expense) across the business. This is the master financial ledger.
* **Page URL:** `/reports/transactions`
* **Search Fields:**
    | Field Name | Field Type |
    | :--- | :--- |
    | Transaction Type | Dropdown ("Income", "Expense") |
    | Transaction Reference | Dropdown ("Acceptance", "E-Commerce Order", etc.) |
    | Branch | Dropdown |
    | Date From / To | Date Picker |
    | Customer | Text Input |
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | Date | `date` |
    | Debit (Out) | `debit` (Cost of Goods Sold) |
    | Expense | `expense` |
    | Credit (In) | `credit` |
    | Payment Method| `paymentMethod` |
    | Reference | `referenceDescription` (with link to source) |
    | Customer | `customer.name` |
    | Saved By | `user.name` |
* **Summary Footer:** The page must display a summary of totals for the filtered results, including Total In (by payment method), Total Purchase, Profit/Loss, and Cash Flow (Cash In - Cash Out).

<br>

<details>
<summary><h3>4.8 Tracking Device Management (Used Devices)</h3></summary>

This module covers the workflow for buying and selling used devices. Each used device is treated as a unique, single-stock item with its own detailed record.

#### **Master Fields & Business Rules**
This consolidated view lists all fields related to a single tracked device.

**Master Field Table: Tracked Device**
| Field Name | Data Type | Appears On | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | `[List]` | Unique ID for the tracked device record. |
| `deviceCategory`| String | `[List]`, `[Add/Edit]`| e.g., "Smartphone", "Tablet/iPad". Required. |
| `brand` | String (Reference) | `[List]`, `[Add/Edit]`| The device brand. Required. |
| `model` | String (Reference) | `[List]`, `[Add/Edit]`| The device model. Required. |
| `imei` | String | `[List]`, `[Add/Edit]`| The IMEI or serial number. Required & must be unique. |
| `purchasePrice`| Number | `[List]`, `[Add/Edit]`| The price paid to acquire the device. Required. |
| `salePrice` | Number | `[List]`, `[Add/Edit]`| The standard selling price to a customer. Required. |
| `resellerPrice`| Number | `[Add/Edit]` | A special price for other businesses/resellers. Required. |
| `supplierId` | String (Reference) | `[Add/Edit]` | The person/entity from whom the device was bought. Required. |
| `condition` | String | `[List]`, `[Add/Edit]`| "Used" or "New". Required. |
| `grade` | String | `[Add/Edit]` | The cosmetic grade of the device (e.g., A+, A, B). |
| `batteryHealth`| String | `[Add/Edit]` | The battery health percentage. |
| `rom` / `ram` | String | `[Add/Edit]` | Device storage and memory specifications. |
| `notes` | Text | `[Add/Edit]` | Any notes about the device's condition or history. |
| `branchId` | String (Reference) | `[List]`, `[Add/Edit]`| The branch where the device is located. Required. |
| `addToKhata` | Boolean | `[Add/Edit]` | If "Yes", a transaction is immediately added to the ledger for the purchase. |
| `documents` | Array of Files | `[Add/Edit]` | Scanned documents like ID or invoice. |

**Common Business Rules:**
- Each tracked device is a unique entity. Its sale is a one-time event.
- When a new device is added with "Add to Khata" set to "Yes", an expense transaction must be created in the master `Transaction` ledger.
- When a tracked device is sold, an income transaction must be created in the master `Transaction` ledger.

---
### **Page-Specific Views**
* [Go to Add New Device Page Details](#add-new-device-page)
* [Go to Tracking Devices List Page Details](#tracking-devices-list-page)

---
<br>

#### **Add New Device Page Details** {#add-new-device-page}
* **Purpose:** To register a new used device into the system, typically after purchasing it from a customer or supplier.
* **Page URL:** `/tracking/new`
* **Fields on this Page:**

| Field Label | Field Type | Required |
| :--- | :--- | :--- |
| Device Category| Dropdown | Yes |
| Brand | Searchable Dropdown| Yes |
| Model | Searchable Dropdown| Yes |
| Device Type | Dropdown | No |
| IMEI/Serial No | Text Input | Yes |
| Color | Dropdown | Yes |
| Grade | Text Input | No |
| Battery Health | Text Input | No |
| Purchase Price | Number Input | Yes |
| Sale Price | Number Input | Yes |
| Reseller Price | Number Input | Yes |
| Supplier | Searchable Dropdown| Yes |
| ROM / RAM / etc. | Text Inputs | No |
| Note | Text Area | No |
| Branch | Dropdown | Yes |
| Touch Screen | Checkbox | No |
| Box Included? | Radio (Yes/No) | No |
| Charger Included?| Radio (Yes/No) | No |
| Condition | Radio (Used/New) | Yes |
| Add to Khata? | Radio (Yes/No) | Yes |
| Document Type | Dropdown | No |
| File 1 / 2 / 3 | File Upload | No |

<br>

#### **Tracking Devices List Page Details** {#tracking-devices-list-page}
* **Purpose:** To view, search, and manage all used devices currently in stock.
* **Page URL:** `/tracking`
* **Search Fields:** Brand, Model, IMEI, Branch, Condition.
* **Table Columns:** `Date`, `IMEI`, `Device Category`, `Brand`, `Model`, `Purchase Price`, `Sale Price`, `Status`.

</details>




<details>
<summary><h3>4.7 Managerial Tasks & Reporting</h3></summary>

This section covers high-level reporting and financial management tools, primarily for `Manager` and `Administrator` roles. This is the core of the system's accounting and business intelligence capabilities.

#### **Master Data Models & Rules**
This consolidated view describes the data structures for financial and logistical records.

**Master Data Table: Transaction**
* **AI Context:** A new `Transaction` record **must** be created automatically for every single financial event that occurs in the system: a completed `Sale`, a `Repair` payment, a `Product Purchase`, a general `Expense`, and the purchase/sale of a `Tracked Device`.

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the transaction. |
| `date` | DateTime | Yes | Timestamp of when the transaction occurred. |
| `type` | String | Yes | "Income" or "Expense". |
| `credit` | Number | No | The amount of money received (income). |
| `debit` | Number | No | The cost of goods sold (COGS) for the transaction. |
| `expense` | Number | No | The amount of a general expense. |
| `paymentMethod`| String | Yes | How the money was paid/received. |
| `referenceType`| String | Yes | The source of the transaction (e.g., "Sale", "Repair"). |
| `referenceId` | String | Yes | The ID of the linked entity (e.g., the `Sale` ID). |
| `referenceDescription`| String | Yes | A human-readable description of the source (e.g., "Sale #22589"). |
| `customerId` | String (Reference)| No | The customer or supplier associated with the transaction. |
| `userId` | String (Reference)| Yes | The employee who recorded the transaction. |

**Master Data Table: DDT (Delivery Note)**
* **AI Context:** A DDT (`Documento di Trasporto`) is a transport document. This feature is likely used for transferring goods between branches or to dealers/partners.

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the DDT document. |
| `date` | Date | Yes | The date the DDT was created. |
| `dealerId` | String (Reference) | Yes | The ID of the `Dealer` (can be another branch or partner). |
| `totalAmount` | Number | Yes | The total value of the items included in the DDT. |
| `acceptanceIds`| Array of Strings | Yes | A list of `Acceptance Number`s being transferred. |

**Common Business Rules:**
- The `Transaction` table is append-only.
- All financial reports are generated by aggregating data from the `Transaction` table.
- A DDT must be generated to formally log the movement of repair jobs (devices) between locations.

---
### **Page-Specific Views**
* [Go to Khata Online (Online Ledger) Page Details](#khata-online-page)
* [Go to Transactions Page Details](#transactions-page)
* [Go to DDT List Page Details](#ddt-list-page)

---
<br>

#### **Khata Online (Online Ledger) Page Details** {#khata-online-page}
* **Purpose:** To provide a high-level daily or monthly financial summary for a selected branch.
* **Page URL:** `/reports/khata`
* **Filters:** Branch, View Report By (Date / Month), Date/Month Picker.
* **Main Report Table:** A daily breakdown of aggregated transactions. Columns include: `Date`, breakdown by payment method (`Cash`, `Card`, etc.), `Total IN`, `Expense`, `Total OUT`, `Profit/Loss`, `In Hand`.
* **Summary Table (Footer):** Provides the grand totals for the entire selected period.

<br>

#### **Transactions Page Details** {#transactions-page}
* **Purpose:** To provide a detailed, searchable log of every financial transaction.
* **Page URL:** `/reports/transactions`
* **Search Fields:** Transaction Type, Transaction Reference, Branch, Date From/To, Customer.
* **Table Columns:** `Date`, `Debit (Out)`, `Expense`, `Credit (In)`, `Payment Method`, `Reference`, `Customer`, `Saved By`.

<br>

#### **DDT List Page Details** {#ddt-list-page}
* **Purpose:** To view, search, and manage Delivery Notes (DDTs) for inter-branch transfers.
* **Page URL:** `/reports/ddt`
* **Search Fields:**
    | Field Name | Field Type |
    | :--- | :--- |
    | Dealer Name | Dropdown |
    | Acceptance Number | Text Input |
    | Created Date From / To | Date Picker |
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | ID | `id` (link to view/print the DDT) |
    | Date | `date` |
    | Dealer | `dealer.name` |
    | Total Amount | `totalAmount` |
    | Acceptance IDs | `acceptanceIds` |

</details>



<details>
<summary><h3>4.8 Tracking Device Management (Used Devices)</h3></summary>

This module covers the complete workflow for buying and selling used devices. Unlike standard inventory products which are fungible (interchangeable), each tracked device is treated as a unique, single-stock item with its own detailed record and history.

#### **Master Fields & Business Rules**
This consolidated view lists all possible attributes of a single tracked device, combining information from the Add and List pages.

**Master Data Table: Tracked Device**

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique internal ID for the device record. |
| `purchaseDate` | DateTime | Yes | The timestamp when the device was added to the system. |
| `deviceCategory`| String | Yes | e.g., "Smartphone", "Tablet/iPad", "PC/Laptop". |
| `brand` | String (Reference) | Yes | The device brand (e.g., Apple, Samsung). |
| `model` | String (Reference) | Yes | The device model. |
| `imei` | String | Yes | The IMEI or serial number. Must be unique for unsold devices. |
| `color` | String | Yes | The color of the device. |
| `condition` | String | Yes | "Used" or "New". |
| `grade` | String | No | The cosmetic grade of the device (e.g., A+, A, B). |
| `batteryHealth`| String | No | The battery health percentage. |
| **[Prices](#tracked-device-pricing-details)** | Number | Yes | Includes `purchasePrice`, `salePrice`, and `resellerPrice`. |
| `supplierId` | String (Reference) | Yes | The person/entity from whom the device was bought. |
| `rom` / `ram` | String | No | Device storage and memory specifications. |
| `notes` | Text | No | Any notes about the device's condition or history. |
| `branchId` | String (Reference) | Yes | The branch where the device is located. |
| `status` | String | Yes | The current status of the device (e.g., "In Stock", "Sold"). |
| **[Add to Khata](#add-to-khata-details)** | Boolean | Yes | If "Yes", a transaction is immediately added to the ledger. |
| `documents` | Array of Files | No | Scanned documents like ID or original invoice. |

**Common Business Rules:**
- Each tracked device is a unique entity with a stock of 1. Its sale is a one-time event.
- When a new device is added with "Add to Khata" set to "Yes", an expense transaction **must** be created in the master `Transaction` ledger.
- When a tracked device is sold, an income transaction **must** be created, and the device's `status` must be updated to "Sold".

---
### **Page-Specific Views**
* [Go to Add New Device Page Details](#add-new-device-page)
* [Go to Tracking Devices List Page Details](#tracking-devices-list-page)

---
<br>

#### **Add New Device Page Details** {#add-new-device-page}
* **Purpose:** To register a new used device into the system, typically after purchasing it from a customer or supplier.
* **Page URL:** `/tracking/new`
* **Layout:** A three-column form layout.
* **Fields on this Page:**

| Field Label | Field Type | Required | Column |
| :--- | :--- | :--- | :--- |
| Device Category| Dropdown | Yes | Left |
| Brand | Searchable Dropdown| Yes | Left |
| Model | Searchable Dropdown| Yes | Left |
| Device Type | Dropdown | No | Left |
| IMEI/Serial No | Text Input | Yes | Left |
| Color | Dropdown | Yes | Left |
| Grade | Text Input | No | Left |
| Battery Health | Text Input | No | Left |
| Purchase Price | Number Input | Yes | Left |
| Sale Price | Number Input | Yes | Left |
| Reseller Price | Number Input | Yes | Left |
| Supplier | Searchable Dropdown| Yes | Left |
| ROM / RAM / Processor etc. | Text Inputs | No | Center |
| Note | Text Area | No | Center |
| Branch | Dropdown | Yes | Center |
| Touch Screen | Checkbox | No | Right |
| Box Included? | Radio (Yes/No) | No | Right |
| Charger Included?| Radio (Yes/No) | No | Right |
| Condition | Radio (Used/New) | Yes | Right |
| Add to Khata? | Radio (Yes/No) | Yes | Right |
| Document Type | Dropdown | No | Right |
| File 1 / 2 / 3 | File Upload | No | Right |

<br>

#### **Tracking Devices List Page Details** {#tracking-devices-list-page}
* **Purpose:** To view, search, and manage all used devices currently in stock or previously sold.
* **Page URL:** `/tracking`
* **Search Fields:** A comprehensive set of filters including `Device ID`, `IMEI`, `Model`, `Customer Name`, `Supplier`, `Condition`, `Purchase Date Range`, `Sale Date Range`, `Branch`, and flags like `Sold Items Only`. An "Expand/Close" button toggles the visibility of the search filter area.
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | ID | `id` |
    | Purchase Date | `purchaseDate` |
    | IMEI | `imei` |
    | Suppliers | `supplier.name` |
    | Purchase Price| `purchasePrice` |
    | Brand | `brand` |
    | Model | `model` |
    | Color | `color` |
    | Condition | `condition` |
    | Capacity | `rom` and `ram` (Combined) |
    | Links | Action links: Modify, Barcode, Purchase Invoice, Sale Invoice. |

---

### **Field Deep Dives**

##### **Tracked Device Pricing Details** {#tracked-device-pricing-details}
* **`Purchase Price`:** The cost of acquiring the used device. This is the `debit` for the "Add to Khata" transaction.
* **`Sale Price`:** The standard selling price to a retail customer. This becomes the `credit` when the device is sold.
* **`Reseller Price`:** A different selling price for B2B (business-to-business) customers.
* **AI Context & Suggestions:** Profit calculation is `(Sale Price or Reseller Price) - Purchase Price`. The system must clearly track which price was used for the final transaction.

##### **Add to Khata Details** {#add-to-khata-details}
* **Behavior:** A "Yes/No" radio button.
* **AI Context & Suggestions:** This is a critical integration point. If "Yes", upon saving the new device, the system must immediately create a new `Transaction` record with `type: "Expense"` and `debit: purchasePrice`. This ensures the purchase is reflected in all financial reports.

</details>

<details>
<summary><h3>Managerial Tasks & Reporting (Updated)</h3></summary>

*This section is updated to include the DDT List and a new `DDT` data model.*

#### **Master Data Models & Rules**

**Data Model: Transaction** *(...as previously defined...)*

**Data Model: DDT (Delivery Note)**
* **AI Context:** A DDT (`Documento di Trasporto`) is a transport document used to formally log the movement of goods (in this case, repair jobs) between different business locations (branches or partners).

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the DDT document. |
| `date` | Date | Yes | The date the DDT was created. |
| `dealerId` | String (Reference) | Yes | The ID of the `Dealer` or destination `Branch`. |
| `totalAmount`| Number | Yes | The total value of the items included in the DDT. |
| `acceptanceIds`| Array of Strings | Yes | A list of `Acceptance Number`s being transferred. |

---
### **Page-Specific Views**
* [Go to Khata Online (Online Ledger) Page Details](#khata-online-page)
* [Go to Transactions Page Details](#transactions-page)
* [Go to DDT List Page Details](#ddt-list-page)

---
<br>

#### **DDT List Page Details** {#ddt-list-page}
* **Purpose:** To view, search, and manage Delivery Notes (DDTs) for inter-branch transfers of repair jobs.
* **Page URL:** `/reports/ddt`
* **Search Fields:**
    | Field Name | Field Type |
    | :--- | :--- |
    | Dealer Name | Dropdown |
    | Acceptance Number | Text Input |
    | Created Date From / To | Date Picker |
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | ID | `id` (link to view/print the DDT) |
    | Date | `date` |
    | Dealer | `dealer.name` |
    | Total Amount | `totalAmount` |
    | Acceptance IDs | `acceptanceIds` |

*(...other pages in this section as previously defined...)*

</details>


<details>
<summary><h3>4.7 Managerial Tasks & Reporting</h3></summary>

This section covers high-level reporting and financial management tools, primarily for `Manager` and `Administrator` roles. This is the core of the system's accounting, HR, and business intelligence capabilities.

#### **Master Data Models & Rules**
This consolidated view describes the data structures for financial and logistical records.

**Master Data Table: Transaction**
* **AI Context:** A new `Transaction` record **must** be created automatically for every single financial event in the system: a completed `Sale`, a `Repair` payment, a `Product Purchase`, a general `Expense`, and the purchase/sale of a `Tracked Device`.

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the transaction. |
| `date` | DateTime | Yes | Timestamp of when the transaction occurred. |
| `type` | String | Yes | "Income" or "Expense". |
| `credit` | Number | No | The amount of money received (income). |
| `debit` | Number | No | The cost of goods sold (COGS) for the transaction. |
| `expense` | Number | No | The amount of a general expense. |
| `paymentMethod`| String | Yes | How the money was paid/received. |
| `referenceType`| String | Yes | The source of the transaction (e.g., "Sale", "Repair"). |
| `referenceId` | String | Yes | The ID of the linked entity (e.g., the `Sale` ID). |
| `referenceDescription`| String | Yes | A human-readable description of the source (e.g., "Sale #22589"). |
| `customerId` | String (Reference)| No | The customer or supplier associated with the transaction. |
| `userId` | String (Reference)| Yes | The employee who recorded the transaction. |

**Master Data Table: DDT (Delivery Note)**
* **AI Context:** A DDT (`Documento di Trasporto`) is a transport document used to formally log the movement of goods (in this case, repair jobs) between different business locations (branches or partners).

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the DDT document. |
| `date` | Date | Yes | The date the DDT was created. |
| `dealerId` | String (Reference) | Yes | The ID of the `Dealer` or destination `Branch`. |
| `totalAmount` | Number | Yes | The total value of the items included in the DDT. |
| `acceptanceIds`| Array of Strings | Yes | A list of `Acceptance Number`s being transferred. |

**Master Data Table: Attendance**
| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the attendance record. |
| `userId` | String (Reference) | Yes | The ID of the employee (`User`) checking in. |
| `branchId` | String (Reference) | Yes | The ID of the `Branch` where the check-in occurred. |
| `date` | DateTime | Yes | The exact timestamp of the check-in. |

**Common Business Rules:**
- The `Transaction` table is append-only for a clean audit trail.
- All financial reports are generated by aggregating data from the `Transaction` table.
- A DDT must be generated to formally log the movement of repair jobs between locations.
- The `Attendance` system should ideally have a simple "Clock In" button on the dashboard for employees to record their presence.

---
### **Page-Specific Views**
* [Go to Khata Online (Online Ledger) Page Details](#khata-online-page)
* [Go to Transactions Page Details](#transactions-page)
* [Go to DDT List Page Details](#ddt-list-page)
* [Go to Attendances Page Details](#attendances-page)

---
<br>

#### **Khata Online (Online Ledger) Page Details** {#khata-online-page}
* **Purpose:** To provide a high-level daily or monthly financial summary for a selected branch.
* **Page URL:** `/reports/khata`
* **Filters:** Branch, View Report By (Date / Month), Date/Month Picker.
* **Main Report Table:** A daily breakdown of aggregated transactions. Columns include: `Date`, breakdown by payment method (`Cash`, `Card`, etc.), `Total IN`, `Expense`, `Total OUT`, `Profit/Loss`, `In Hand`.
* **Summary Table (Footer):** Provides the grand totals for the entire selected period.

<br>

#### **Transactions Page Details** {#transactions-page}
* **Purpose:** To provide a detailed, searchable log of every financial transaction.
* **Page URL:** `/reports/transactions`
* **Search Fields:** Transaction Type, Transaction Reference, Branch, Date From/To, Customer.
* **Table Columns:** `Date`, `Debit (Out)`, `Expense`, `Credit (In)`, `Payment Method`, `Reference`, `Customer`, `Saved By`.

<br>

#### **DDT List Page Details** {#ddt-list-page}
* **Purpose:** To view, search, and manage Delivery Notes (DDTs) for inter-branch transfers of repair jobs.
* **Page URL:** `/reports/ddt`
* **Search Fields:**
    | Field Name | Field Type |
    | :--- | :--- |
    | Dealer Name | Dropdown |
    | Acceptance Number | Text Input |
    | Created Date From / To | Date Picker |
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | ID | `id` (link to view/print the DDT) |
    | Date | `date` |
    | Dealer | `dealer.name` |
    | Total Amount | `totalAmount` |
    | Acceptance IDs | `acceptanceIds` |

<br>

#### **Attendances Page Details** {#attendances-page}
* **Purpose:** To view and filter employee attendance records.
* **Page URL:** `/reports/attendances`
* **Search Fields:**
    | Field Name | Field Type |
    | :--- | :--- |
    | Employee | Dropdown |
    | Branch | Dropdown |
    | Date From / To | Date Picker |
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | Name | `user.name` |
    | Branch | `branch.name` |
    | Date | `date` |

</details>



<details>
<summary><h3>4.7 Managerial Tasks & Reporting</h3></summary>

This section covers high-level reporting and financial management tools, primarily for `Manager` and `Administrator` roles. This is the core of the system's accounting, HR, and business intelligence capabilities.

#### **Master Data Models & Rules**
This consolidated view describes the data structures for financial, logistical, and HR records.

**Master Data Table: Transaction** *(...as previously defined...)*

**Master Data Table: DDT (Delivery Note)** *(...as previously defined...)*

**Master Data Table: Attendance**
| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the attendance record. |
| `userId` | String (Reference) | Yes | The ID of the employee (`User`) checking in. |
| `branchId` | String (Reference) | Yes | The ID of the `Branch` where the check-in occurred. |
| `timestamp` | DateTime | Yes | The exact timestamp of the check-in event. |

**Common Business Rules:**
- The `Transaction` table is append-only for a clean audit trail.
- All financial reports are generated by aggregating data from the `Transaction` table.
- A DDT must be generated to formally log the movement of repair jobs between locations.
- The `Attendance` system should ideally have a simple "Clock In" button on the dashboard for employees to record their presence.

---
### **Page-Specific Views**
* [Go to Khata Online (Online Ledger) Page Details](#khata-online-page)
* [Go to Transactions Page Details](#transactions-page)
* [Go to DDT List Page Details](#ddt-list-page)
* [Go to Attendances Page Details](#attendances-page)
* [Go to Employee Performance (Track Record) Page Details](#employee-performance-page)

---
<br>

#### **Khata Online (Online Ledger) Page Details** {#khata-online-page}
* **Purpose:** To provide a high-level daily or monthly financial summary for a selected branch.
* **Page URL:** `/reports/khata`
* **Filters:** Branch, View Report By (Date / Month), Date/Month Picker.
* **Main Report Table:** A daily breakdown of aggregated transactions. Columns include: `Date`, breakdown by payment method (`Cash`, `Card`, etc.), `Total IN`, `Expense`, `Total OUT`, `Profit/Loss`, `In Hand`.
* **Summary Table (Footer):** Provides the grand totals for the entire selected period.

<br>

#### **Transactions Page Details** {#transactions-page}
* **Purpose:** To provide a detailed, searchable log of every financial transaction.
* **Page URL:** `/reports/transactions`
* **Search Fields:** Transaction Type, Transaction Reference, Branch, Date From/To, Customer.
* **Table Columns:** `Date`, `Debit (Out)`, `Expense`, `Credit (In)`, `Payment Method`, `Reference`, `Customer`, `Saved By`.

<br>

#### **DDT List Page Details** {#ddt-list-page}
* **Purpose:** To view, search, and manage Delivery Notes (DDTs) for inter-branch transfers of repair jobs.
* **Page URL:** `/reports/ddt`
* **Search Fields:** Dealer Name, Acceptance Number, Created Date From/To.
* **Table Columns:** `ID`, `Date`, `Dealer`, `Total Amount`, `Acceptance IDs`.

<br>

#### **Attendances Page Details** {#attendances-page}
* **Purpose:** To view and filter employee attendance records (clock-ins).
* **Page URL:** `/reports/attendances`
* **Search Fields:**
    | Filter Name | Field Type |
    | :--- | :--- |
    | Employee | Dropdown |
    | Branch | Dropdown |
    | Date From / To | Date Picker |
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | Name | `user.name` |
    | Branch | `branch.name` |
    | Date | `timestamp` |

<br>

#### **Employee Performance (Track Record) Page Details** {#employee-performance-page}
* **Purpose:** To view a performance report for a specific technician over a selected period.
* **Page URL:** `/reports/employee-performance`
* **Filters:**
    | Filter Name | Field Type | Required |
    | :--- | :--- | :--- |
    | Technician Name | Dropdown | Yes |
    | View Report By | Radio (Date / Month) | Yes |
    | Date / Month | Date or Month Picker | Yes |
* **Report Content (Output):** *(Note: The output is not visible in the screenshot, but a logical report would contain the following metrics for the selected technician and period.)*
    - Total Jobs Assigned
    - Total Jobs Completed
    - Average Repair Time
    - Total Revenue Generated (from their completed jobs)
    - Total Profit Generated (from their completed jobs)
    - A list of all jobs they worked on during the period.

---

### **Field Deep Dives**

##### **Employee Performance Calculation** {#employee-performance-details}
* **Behavior:** This is a complex aggregation report. It requires the system to query multiple data sources and link them to a specific user.
* **AI Context & Suggestions:** To generate this report, the backend must:
    1.  Filter all `Jobs` where `technicianId` matches the selected user and the job's date falls within the selected period.
    2.  Calculate metrics like `COUNT(Jobs)` for assigned/completed totals.
    3.  Calculate `AVG(deliveryDate - repairDate)` for average repair time.
    4.  Filter the `Transactions` table to find all income transactions where `referenceType` is "Repair" and the `referenceId` matches the technician's completed jobs.
    5.  Sum the `credit` and `debit` from these transactions to calculate total revenue and profit for that employee. This is a powerful feature for measuring productivity and profitability per employee.

</details>



<details>
<summary><h3>4.2 Sales Management</h3></summary>

This section contains all requirements for processing sales transactions. The system must support two distinct types of sales: a comprehensive, inventory-linked Point of Sale (POS) system and a simple form for general, non-inventory sales. It also includes management for orders originating from an e-commerce platform.

#### **Master Fields & Business Rules**
This consolidated view helps with database design by listing all fields related to sales transactions.

**Master Field Table: Sale**
| Field Name | Data Type | Appears On | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| **[Customer](#sale-customer-details)** | Reference (Customer ID) | `[Inventory Sale]`, `[Online Order]`, `[Sales History]` | The customer making the purchase. Required. Defaults to a "Walk-in Customer" for POS. |
| **[Items (Sales Cart)](#sales-cart-details)** | Array of Objects | `[Inventory Sale]`, `[Online Order]` | A list of products from inventory being sold. |
| **[Product (Manual Entry)](#general-sale-details)**| String | `[General Sale]` | Manually entered product name for a non-inventory sale. |
| **[Purchase Price (Manual)](#general-sale-details)**| Number | `[General Sale]` | Manually entered cost of the item for a general sale to calculate profit. |
| [Payment Method](#) | String | `[All Sales]` | Method of payment (e.g., "Cash", "Card"). Required. |
| [Paid Amount](#) | Number | `[All Sales]` | The amount paid by the customer. Required. |
| [Order Note](#) | Text | `[Inventory Sale]`, `[Online Order]` | Optional notes related to the entire order. |
| **[Order Status](#order-status-details)** | String | `[Online Order]` | The fulfillment status of an online order (e.g., "Pending", "Completed"). |
| **[Payment Status](#payment-status-details)** | String | `[Online Order]` | The payment status of an online order (e.g., "Received", "Pending"). |

**Common Business Rules:**
- All sales must generate an immutable transaction record.
- Inventory-linked sales **must** automatically deduct the sold quantity from the `Product` stock upon completion.
- The system must handle VAT calculations (e.g., +22%) for all inventory-linked sales.
- Profit for each sale should be calculated and stored.

---
### **Page-Specific Views**
These sections show the exact fields and layout for each individual page for easy verification.

* [Go to New Inventory Sale Page Details](#new-inventory-sale-page)
* [Go to New General Sale Page Details](#new-general-sale-page)
* [Go to Sales History Page Details](#sales-history-page)
* [Go to E-Commerce Orders List Page Details](#ecommerce-orders-list-page)

---
<br>

#### **New Inventory Sale Page Details** {#new-inventory-sale-page}
* **Purpose:** A POS interface for selling products from inventory in-store.
* **Page URL:** `/sales/new`
* **Layout:** Two-column layout (Product Search/Cart on left, Order/Payment on right).
* **Components & Fields:** Product Search Bar, Sales Cart Table, Order Summary Panel (Customer, Totals, Discount, Payment), `Complete Sale` button.

<br>

#### **New General Sale Page Details** {#new-general-sale-page}
* **Purpose:** A simple form for quickly logging non-inventory sales.
* **Page URL:** `/sales/general`
* **Fields:** Client, Product, Branch, Paid Amount, Purchase Price, Payment Method.

<br>

#### **Sales History Page Details** {#sales-history-page}
* **Purpose:** To view a list of all past sales transactions.
* **Page URL:** `/sales`
* **Table Columns:** `Sale ID`, `Date`, `Customer ID`, `Items`, `Total Amount`, `Payment Method`.

<br>

#### **E-Commerce Orders List Page Details** {#ecommerce-orders-list-page}
* **Purpose:** To manage all orders originating from the e-commerce website.
* **Page URL:** `/sales/online-orders`
* **Search Fields:**
    | Filter Name | Field Type |
    | :--- | :--- |
    | Payment Status | Dropdown (e.g., "Any", "Received") |
    | Order Status | Dropdown (e.g., "Any", "Completed", "Pending") |
    | Contact Name | Text Input |
    | Order Number | Text Input |
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | Serial | Row number |
    | Order ID | `id` |
    | Order Total | `totalAmount` |
    | Name | `customer.name` |
    | Mobile | `customer.phone` |
    | Order Status | `orderStatus` |
    | Payment Status| `paymentStatus` |
    | Submitted date| `createdDate` |
    | Updated date | `updatedDate` |
    | Actions | Links (View Order, Edit Order, Invoice) |

---

### **Field Deep Dives**

##### **Order Status Details** {#order-status-details}
* **Behavior:** Represents the physical state of an online order in the fulfillment process.
* **Values:** `Pending`, `Processing`, `Payment Received`, `Waiting to Deliver`, `Completed`, `Canceled`.
* **AI Context & Suggestions:** This is a state machine. The status should only be allowed to change in a logical sequence (e.g., from `Pending` to `Processing`, but not directly to `Completed`). The list of statuses should be configurable in **System Settings**.

##### **Payment Status Details** {#payment-status-details}
* **Behavior:** Represents the financial state of an online order.
* **Values:** `Pending`, `Received`, `Refunded`.
* **AI Context & Suggestions:** Changing the `Payment Status` to "Received" must trigger the creation of an "Income" record in the master `Transaction` table. This is the key link between the e-commerce module and the accounting system.

*(...other deep dives as previously defined...)*

</details>





<details>
<summary><h3>4.7 Managerial Tasks & Reporting</h3></summary>

This section covers high-level reporting and financial management tools, primarily for `Manager` and `Administrator` roles. This is the core of the system's accounting, HR, and business intelligence capabilities.

#### **Master Data Models & Rules**
This consolidated view describes the data structures for financial, logistical, and HR records.

**Master Data Table: Transaction**
* **AI Context:** A new `Transaction` record **must** be created automatically for every single financial event in the system: a completed `Sale`, a `Repair` payment, a `Product Purchase`, a general `Expense`, and the purchase/sale of a `Tracked Device`.

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the transaction. |
| `date` | DateTime | Yes | Timestamp of when the transaction occurred. |
| `type` | String | Yes | "Income" or "Expense". |
| `credit` | Number | No | The amount of money received (income). |
| `debit` | Number | No | The cost of goods sold (COGS) for the transaction. |
| `expense` | Number | No | The amount of a general expense. |
| `paymentMethod`| String | Yes | How the money was paid/received. |
| `referenceType`| String | Yes | The source of the transaction (e.g., "Sale", "Repair"). |
| `referenceId` | String | Yes | The ID of the linked entity (e.g., the `Sale` ID). |
| `referenceDescription`| String | Yes | A human-readable description of the source (e.g., "Sale #22589"). |
| `customerId` | String (Reference)| No | The customer or supplier associated with the transaction. |
| `userId` | String (Reference)| Yes | The employee who recorded the transaction. |

**Master Data Table: DDT (Delivery Note)**
* **AI Context:** A DDT (`Documento di Trasporto`) is a transport document used to formally log the movement of goods (in this case, repair jobs) between different business locations (branches or partners).

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the DDT document. |
| `date` | Date | Yes | The date the DDT was created. |
| `dealerId` | String (Reference) | Yes | The ID of the `Dealer` or destination `Branch`. |
| `totalAmount` | Number | Yes | The total value of the items included in the DDT. |
| `acceptanceIds`| Array of Strings | Yes | A list of `Acceptance Number`s being transferred. |

**Master Data Table: Attendance**
| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the attendance record. |
| `userId` | String (Reference) | Yes | The ID of the employee (`User`) checking in. |
| `branchId` | String (Reference) | Yes | The ID of the `Branch` where the check-in occurred. |
| `timestamp` | DateTime | Yes | The exact timestamp of the check-in event. |

**Common Business Rules:**
- The `Transaction` table is append-only for a clean audit trail.
- All financial reports are generated by aggregating data from the `Transaction` table.
- A DDT must be generated to formally log the movement of repair jobs between locations.
- The `Attendance` system should ideally have a simple "Clock In" button on the dashboard for employees to record their presence.

---
### **Page-Specific Views**
* [Go to Khata Online (Online Ledger) Page Details](#khata-online-page)
* [Go to Transactions Page Details](#transactions-page)
* [Go to DDT List Page Details](#ddt-list-page)
* [Go to Attendances Page Details](#attendances-page)
* [Go to Employee Performance (Track Record) Page Details](#employee-performance-page)

---
<br>

#### **Khata Online (Online Ledger) Page Details** {#khata-online-page}
* **Purpose:** To provide a high-level daily or monthly financial summary for a selected branch.
* **Page URL:** `/reports/khata`
* **Filters:** Branch, View Report By (Date / Month), Date/Month Picker.
* **Main Report Table:** A daily breakdown of aggregated transactions. Columns include: `Date`, breakdown by payment method (`Cash`, `Card`, etc.), `Total IN`, `Expense`, `Total OUT`, `Profit/Loss`, `In Hand`.
* **Summary Table (Footer):** Provides the grand totals for the entire selected period.

<br>

#### **Transactions Page Details** {#transactions-page}
* **Purpose:** To provide a detailed, searchable log of every financial transaction.
* **Page URL:** `/reports/transactions`
* **Search Fields:** Transaction Type, Transaction Reference, Branch, Date From/To, Customer.
* **Table Columns:** `Date`, `Debit (Out)`, `Expense`, `Credit (In)`, `Payment Method`, `Reference`, `Customer`, `Saved By`.

<br>

#### **DDT List Page Details** {#ddt-list-page}
* **Purpose:** To view, search, and manage Delivery Notes (DDTs) for inter-branch transfers of repair jobs.
* **Page URL:** `/reports/ddt`
* **Search Fields:** Dealer Name, Acceptance Number, Created Date From/To.
* **Table Columns:** `ID`, `Date`, `Dealer`, `Total Amount`, `Acceptance IDs`.

<br>

#### **Attendances Page Details** {#attendances-page}
* **Purpose:** To view and filter employee attendance records (clock-ins).
* **Page URL:** `/reports/attendances`
* **Search Fields:**
    | Filter Name | Field Type |
    | :--- | :--- |
    | Employee | Dropdown |
    | Branch | Dropdown |
    | Date From / To | Date Picker |
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | Name | `user.name` |
    | Branch | `branch.name` |
    | Date | `timestamp` |

<br>

#### **Employee Performance (Track Record) Page Details** {#employee-performance-page}
* **Purpose:** To view a performance report for a specific technician over a selected period.
* **Page URL:** `/reports/employee-performance`
* **Filters:**
    | Filter Name | Field Type | Required |
    | :--- | :--- | :--- |
    | Technician Name | Dropdown | Yes |
    | View Report By | Radio (Date / Month) | Yes |
    | Date / Month | Date or Month Picker | Yes |
* **Report Content (Output):** *(Note: The output is not visible in the screenshot, but a logical report would contain the following metrics for the selected technician and period.)*
    - Total Jobs Assigned
    - Total Jobs Completed
    - Average Repair Time
    - Total Revenue Generated (from their completed jobs)
    - Total Profit Generated (from their completed jobs)
    - A list of all jobs they worked on during the period.

---

### **Field Deep Dives**

##### **Employee Performance Calculation** {#employee-performance-details}
* **Behavior:** This is a complex aggregation report. It requires the system to query multiple data sources and link them to a specific user.
* **AI Context & Suggestions:** To generate this report, the backend must:
    1.  Filter all `Jobs` where `technicianId` matches the selected user and the job's date falls within the selected period.
    2.  Calculate metrics like `COUNT(Jobs)` for assigned/completed totals.
    3.  Calculate `AVG(deliveryDate - repairDate)` for average repair time.
    4.  Filter the `Transactions` table to find all income transactions where `referenceType` is "Repair" and the `referenceId` matches the technician's completed jobs.
    5.  Sum the `credit` and `debit` from these transactions to calculate total revenue and profit for that employee. This is a powerful feature for measuring productivity and profitability per employee.

</details>



<details>
<summary><h3>4.2 Sales Management</h3></summary>

This section contains all requirements for processing sales and orders. It covers Point of Sale (POS), general sales, e-commerce orders, and spare parts ordering.

#### **Master Data Models & Rules**
This consolidated view describes the data structures for sales and orders.

**Master Data Table: Sale** *(...as previously defined...)*

**Master Data Table: Part Order**
* **AI Context:** This model represents a request to purchase a specific spare part, often for a particular customer's repair job. It tracks the item needed and the associated costs.

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the part order record. |
| `brand` | String (Reference) | Yes | The brand of the device the part is for. |
| `model` | String (Reference) | Yes | The model of the device. |
| `productName` | String | Yes | The name of the spare part being ordered. |
| `color` | String (Reference) | No | The color of the part, if applicable. |
| `quantity` | Integer | Yes | The quantity of the part being ordered. |
| `acceptanceNumber`| String | No | Optional link to the `Job` (repair) that requires this part. |
| `supplierDetails`| String | No | Free-text details about the supplier for this specific order. |
| `isUrgent` | Boolean | Yes | Flag to mark the order as urgent. |
| `customerId` | String (Reference) | No | Optional link to the customer for whom the part is ordered. |
| `paymentMethod`| String | No | How the part was paid for. |
| `totalAmount` | Number | No | The total cost of the order. |
| `paidAmount` | Number | No | The amount paid upfront for the part. |
| `purchasePrice`| Number | No | The cost (expense) associated with acquiring the part. |
| `notes` | Text | No | Additional notes about the order. |
| `orderType` | String | Yes | The type of item being ordered: "Accessori", "DEVICE", or "RICAMBI". |

---
### **Page-Specific Views**
* [Go to New Inventory Sale Page Details](#new-inventory-sale-page)
* [Go to New General Sale Page Details](#new-general-sale-page)
* [Go to Sales History Page Details](#sales-history-page)
* [Go to E-Commerce Orders List Page Details](#ecommerce-orders-list-page)
* [Go to Submit Spare Parts Order Page Details](#submit-spare-parts-order-page)

---
<br>

#### **New Inventory Sale Page Details** {#new-inventory-sale-page}
*(...as previously defined...)*

<br>

#### **New General Sale Page Details** {#new-general-sale-page}
*(...as previously defined...)*

<br>

#### **Sales History Page Details** {#sales-history-page}
*(...as previously defined...)*

<br>

#### **E-Commerce Orders List Page Details** {#ecommerce-orders-list-page}
*(...as previously defined...)*

<br>

#### **Submit Spare Parts Order Page Details** {#submit-spare-parts-order-page}
* **Purpose:** To create a record for a spare part that needs to be ordered from a supplier, often linked to a specific repair job.
* **Page URL:** `/sales/order-parts/new`
* **Layout:** A two-column form layout.
* **Fields on this Page:**
    | Field Label | Field Type | Required | Column |
    | :--- | :--- | :--- | :--- |
    | Brand | Searchable Dropdown | Yes | Left |
    | Model | Searchable Dropdown | Yes | Left |
    | Product | Text Input | Yes | Left |
    | Color | Dropdown | No | Left |
    | Quantity | Number Input | Yes | Left |
    | Acceptance Number| Text Input | No | Left |
    | Supplier Details | Text Input | No | Left |
    | Urgent? | Radio (Yes/No) | No | Left |
    | Customer Name | Searchable Dropdown | No | Right |
    | Payment Method | Dropdown | No | Right |
    | Payment Receipt Number| Text Input | No | Right |
    | Total Amount | Number Input | No | Right |
    | Paid Amount | Number Input | No | Right |
    | Expense / Purchase Price | Number Input | No | Right |
    | Additional Note| Text Area | No | Right |
    | Order Parts Type| Radio ("Accessori", "DEVICE", "RICAMBI") | Yes | Right |

---

### **Field Deep Dives**

*(...other deep dives as previously defined...)*

</details>



<details>
<summary><h3>4.9 E-Commerce Management</h3></summary>

This section details the features for managing products and orders for an external e-commerce website. This is distinct from the in-store POS (`Vendite Magazzino`) and general sales.

#### **Master Data Models & Rules**

**Master Data Table: E-Commerce Product**
* **AI Context:** This model represents a product that is available for sale on the online store. It has its own pricing, stock, and descriptive information separate from the internal-only products.

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `productId` | String | Yes | Unique identifier for the product. |
| `sku` | String | Yes | Stock Keeping Unit. Must be unique. Auto-generated on save. |
| `productName` | String | Yes | The public-facing name of the product. |
| `productCategory`| String (Reference)| Yes | The category the product belongs to (e.g., "RICAMBI", "ALIMENTATORI"). |
| `brand` | String (Reference)| Yes | The product's brand. |
| `model` | String (Reference)| Yes | The product model it is associated with. |
| `isSolidDevice`| Boolean | Yes | A flag, likely to distinguish parts/accessories from whole devices. |
| `purchasePrice`| Number | Yes | The cost to acquire one unit of this product. |
| `desktopPrice` | Number | Yes | The price for in-store (desktop) sales. |
| `onlinePrice` | Number | Yes | The price for e-commerce sales. |
| `color` | String (Reference)| No | The color of the product. |
| `stock` | Integer | Yes | The current inventory level for this product. |
| `productImages`| Array of Files | No | Images of the product for the website. |
| `compatibleModels`| Array of Strings| No | A list of other models this product is compatible with. |
| `productMeta` | Array of Strings| No | Flags for marketing, like "Latest Product", "Top Selling", "On Offer". |
| `lastEdited` | DateTime | Yes | Timestamp of the last time the product was updated. |

**Common Business Rules:**
- When an e-commerce order is completed and payment is received, a corresponding `Transaction` must be created.
- The `stock` level for an `E-Commerce Product` must be automatically decremented when an order is fulfilled.

---
### **Page-Specific Views**
* [Go to E-Commerce Product List Page Details](#ecommerce-product-list-page)
* [Go to Add New E-Commerce Product Page Details](#add-ecommerce-product-page)

---
<br>

#### **E-Commerce Product List Page Details** {#ecommerce-product-list-page}
* **Purpose:** To view, search, manage, and perform bulk operations on all products listed in the e-commerce system.
* **Page URL:** `/admin/products/e-commerce`
* **Search Fields:** A comprehensive set of filters including `SKU`, `Product Name`, `Category`, `Brand`, `Model`, `Condition`, `Stock`, `Price`, and marketing tags.
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | SL# / Checkbox | Row number and a checkbox for bulk operations. |
    | Image | `productImages` (thumbnail) |
    | Product Name | `productName` (links to the product's public page) |
    | Color | `color` |
    | SKU | `sku` |
    | Category | `productCategory` |
    | Brand | `brand` |
    | Desk (Price) | `desktopPrice` |
    | Online (Price)| `onlinePrice` |
    | Purchase (Price)|`purchasePrice` |
    | Stock | `stock` |
    | Last Edited | `lastEdited` |
    | Link | Action links: Stamp (Barcode), View, H.Stock (Home Stock), History, Edit, Delete. |
* **Bulk Operations:** Users can select multiple products and execute an action (e.g., "Update node alias", "Download Selected Product").

<br>

#### **Add New E-Commerce Product Page Details** {#add-ecommerce-product-page}
* **Purpose:** To create a new product for the e-commerce store.
* **Page URL:** `/admin/products/e-commerce/new`
* **Layout:** A multi-column form with various sections.
* **Fields on this Page:**
    | Field Label | Field Type | Required |
    | :--- | :--- | :--- |
    | Product | Text Input | Yes |
    | SKU | Text (Auto-generated) | - |
    | Product Category | Dropdown (with Add button) | Yes |
    | Is Solid Device? | Dropdown (Yes/No) | No |
    | IMEI Number | Text Input | No |
    | Purchase Price | Number Input (EUR) | Yes |
    | Desktop Price | Number Input (EUR) | Yes |
    | Online Price | Number Input (EUR) | Yes |
    | Box Number | Dropdown | No |
    | Color | Dropdown | No |
    | Stock | Number Input | No |
    | Product Images | File Upload | No |
    | Compatible Models | Autocomplete Text Input | No |
    | Product Description | Rich Text Editor | No |
    | Product Brand | Dropdown (with Add button) | Yes |
    | Product Model | Dropdown (with Add button) | No |
    | Product Condition | Dropdown | No |
    | Product Meta | Checkboxes (Show Offer, Latest, Popular) | No |
    | Product Tags | Autocomplete Text Input | No |

</details>



<details>
<summary><h3>4.9 E-Commerce Management</h3></summary>

This section details the features for managing products and orders for an external e-commerce website. This is distinct from the in-store POS (`Vendite Magazzino`) and general sales.

#### **Master Data Models & Rules**

**Master Data Table: E-Commerce Product**
* **AI Context:** This model represents a product that is available for sale on the online store. It has its own pricing, stock, and descriptive information separate from the internal-only products.

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `productId` | String | Yes | Unique identifier for the product. |
| `sku` | String | Yes | Stock Keeping Unit. Must be unique. Auto-generated on save. |
| `productName` | String | Yes | The public-facing name of the product. |
| `productCategory`| String (Reference)| Yes | The category the product belongs to (e.g., "RICAMBI"). |
| `brand` | String (Reference)| Yes | The product's brand. |
| `model` | String (Reference)| No | The product model it is associated with. |
| `isSolidDevice`| Boolean | Yes | Distinguishes parts/accessories from whole devices. Defaults to "No". |
| `purchasePrice`| Number | Yes | The cost to acquire one unit of this product. |
| `desktopPrice` | Number | Yes | The price for in-store (desktop) sales. |
| `onlinePrice` | Number | Yes | The price for e-commerce sales. |
| `color` | String (Reference)| No | The color of the product. |
| `stock` | Integer | Yes | The current inventory level for this product. |
| `productImages`| Array of Files | No | Images of the product for the website. |
| `compatibleModels`| Array of Strings| No | A list of other models this product is compatible with. |
| `productMeta` | Array of Strings| No | Flags for marketing, like "Latest Product", "Top Selling", "On Offer". |
| `lastEdited` | DateTime | Yes | Timestamp of the last time the product was updated. |

**Common Business Rules:**
- When an e-commerce order is completed and payment is received, a corresponding `Transaction` **must** be created.
- The `stock` level for an `E-Commerce Product` **must** be automatically decremented when an order is fulfilled.
- The `SKU` should be automatically generated based on a predefined business rule if left blank.

---
### **Page-Specific Views**
* [Go to Manage E-Commerce Products Page Details](#manage-ecommerce-products-page)
* [Go to Add New E-Commerce Product Page Details](#add-ecommerce-product-page)

---
<br>

#### **Manage E-Commerce Products Page Details** {#manage-ecommerce-products-page}
* **Purpose:** To view, search, manage, and perform bulk operations on all products listed in the e-commerce system.
* **Page URL:** `/ecommerce/products`
* **Search Fields:** A comprehensive set of filters including `SKU`, `Product Name`, `Category`, `Brand`, `Model`, `Condition`, `Stock`, `Price`, and marketing tags.
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | SL# / Checkbox | Row number and a checkbox for bulk operations. |
    | Image | `productImages` (thumbnail) |
    | Product Name | `productName` (links to the product's public page) |
    | Color | `color` |
    | SKU | `sku` |
    | Category | `productCategory` |
    | Brand | `brand` |
    | Desk (Price) | `desktopPrice` |
    | Online (Price)| `onlinePrice` |
    | Purchase (Price)|`purchasePrice` |
    | Stock | `stock` |
    | Last Edited | `lastEdited` |
    | Link | Action links: Stamp (Barcode), View, H.Stock (Home Stock), History, Edit, Delete. |
* **Bulk Operations:** Users can select multiple products and execute an action (e.g., "Download Selected Product").

<br>

#### **Add New E-Commerce Product Page Details** {#add-ecommerce-product-page}
* **Purpose:** To create a new product for the e-commerce store.
* **Page URL:** `/ecommerce/products/new`
* **Layout:** A multi-column form with various sections.
* **Fields on this Page:**
    | Field Label | Field Type | Required |
    | :--- | :--- | :--- |
    | Product | Text Input | Yes |
    | SKU | Text (Auto-generated) | - |
    | Product Category | Dropdown (with Add button) | Yes |
    | Is Solid Device? | Dropdown (Yes/No) | Yes |
    | IMEI Number | Text Input | No |
    | Purchase Price | Number Input (EUR) | Yes |
    | Desktop Price | Number Input (EUR) | Yes |
    | Online Price | Number Input (EUR) | Yes |
    | Box Number | Dropdown | No |
    | Color | Dropdown | No |
    | Stock | Number Input | No |
    | Product Images | File Upload | No |
    | Compatible Models | Autocomplete Text Input | No |
    | Home Stock | Text Input | No |
    | Product Description | Rich Text Editor | No |
    | Product Brand | Dropdown (with Add button) | Yes |
    | Product Model | Dropdown (with Add button) | No |
    | Product Condition | Dropdown | No |
    | Product Meta | Checkboxes (Latest, showOffer, Popular, Top Selling) | No |
    | Product Tags | Autocomplete Text Input | No |

</details>



<details>
<summary><h3>4.10 Expense Management</h3></summary>

This module handles the recording and tracking of general business expenses that are not tied to specific inventory purchases or repair parts.

#### **Master Data Models & Rules**

**Master Data Table: General Expense**
* **AI Context:** This model represents any general operational cost for the business, such as rent, salaries, or utilities. It is a direct input into the financial ledger.

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the expense record. |
| `title` | String | Yes | A description of the expense. |
| `amount` | Number | Yes | The monetary value of the expense. |
| `branchId` | String (Reference)| Yes | The branch that incurred the expense. |
| `expenseDate`| Date | Yes | The date the expense occurred. |
| `dateSaved` | DateTime | Yes | The timestamp when the record was created in the system. |

**Common Business Rules:**
- When a new `General Expense` is created, it **must** automatically generate a new record in the master `Transaction` table.
- The corresponding `Transaction` record will have a `type` of "Expense" and its `expense` field will be populated with the `amount` from this record.

---
### **Page-Specific Views**
* [Go to List of General Expenses Page Details](#list-of-general-expenses-page)

---
<br>

#### **List of General Expenses Page Details** {#list-of-general-expenses-page}
* **Purpose:** To view, search, and manage all recorded general business expenses.
* **Page URL:** `/expenses`
* **Search Fields:**
    | Filter Name | Field Type |
    | :--- | :--- |
    | Branch | Dropdown |
    | Amount | Text Input |
    | Expense Title | Text Input |
    | Created Date From / To | Date Picker |
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | ID | `id` (links to the edit page for that expense) |
    | Title | `title` |
    | Amount | `amount` |
    | Branch | `branch.name` |
    | Expense Date | `expenseDate` |
    | Date Saved | `dateSaved` |

</details>


<details>
<summary><h3>4.10 Expense Management</h3></summary>

This module handles the recording and tracking of general business expenses that are not directly tied to specific inventory purchases or repair parts (e.g., rent, utilities, salaries).

#### **Master Data Models & Rules**

**Master Data Table: General Expense**
* **AI Context:** This model represents any general operational cost for the business. It is a direct input into the financial ledger.

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the expense record. |
| `title` | String | Yes | A short description of the expense. |
| `amount` | Number | Yes | The monetary value of the expense. |
| `branchId` | String (Reference)| Yes | The branch that incurred the expense. |
| `expenseDate`| Date | Yes | The date the expense occurred (not when it was entered). |
| `expenseType` | String (Reference)| Yes | The category of the expense (e.g., "Device Buy", "Salary"). |
| `notes` | Text | No | Any additional notes or details about the expense. |
| `dateSaved` | DateTime | Yes | The timestamp when the record was created in the system. |

**Common Business Rules:**
- When a new `General Expense` is saved, it **must** automatically generate a new record in the master `Transaction` table.
- The corresponding `Transaction` record will have a `type` of "Expense", and its `expense` field will be populated with the `amount` from this record. This ensures financial reports like the "Khata Online" are always accurate.

---
### **Page-Specific Views**
* [Go to List of General Expenses Page Details](#list-of-general-expenses-page)
* [Go to Add General Expense Page Details](#add-general-expense-page)

---
<br>

#### **List of General Expenses Page Details** {#list-of-general-expenses-page}
* **Purpose:** To view, search, and manage all recorded general business expenses.
* **Page URL:** `/expenses`
* **Search Fields:**
    | Filter Name | Field Type |
    | :--- | :--- |
    | Branch | Dropdown |
    | Amount | Text Input |
    | Expense Title | Text Input |
    | Created Date From / To | Date Picker |
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | ID | `id` (links to the edit page for that expense) |
    | Title | `title` |
    | Amount | `amount` |
    | Branch | `branch.name` |
    | Expense Date | `expenseDate` |
    | Date Saved | `dateSaved` |

<br>

#### **Add General Expense Page Details** {#add-general-expense-page}
* **Purpose:** To create a new record for a general business expense.
* **Page URL:** `/expenses/new`
* **Fields on this Page:**
    | Field Label | Field Type | Required |
    | :--- | :--- | :--- |
    | Expense Title | Text Input | Yes |
    | Amount | Number Input | Yes |
    | Expense Date | Date Picker | Yes |
    | Additional Note| Text Area | No |
    | General Expense | Dropdown (Expense Type) | Yes |
    | Branch | Dropdown (with Add button) | Yes |

</details>



<details>
<summary><h3>4.11 User & System Management</h3></summary>

This module covers the administration of users, roles, permissions, and other system-level configurations. Access to this section should be strictly limited to the `Administrator` role.

#### **Master Data Models & Rules**

**Master Data Table: User**
* **AI Context:** This model represents an individual with access to the system, including employees and potentially system-level customers or dealers. Each user is assigned one or more roles that define their permissions.

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the user. |
| `name` | String | Yes | The full name of the user. |
| `email` | String | Yes | The user's email address, used for login. Must be unique. |
| `phone` | String | No | The user's primary phone number. |
| `mobile` | String | No | The user's mobile phone number. |
| `roles` | Array of Strings| Yes | A list of assigned roles (e.g., "Manager", "Technician"). |
| `branchId` | String (Reference)| Yes | The primary branch the user is associated with. |
| `isActive` | Boolean | Yes | A flag to enable or disable the user's account. Defaults to "Yes". |

**Common Business Rules:**
- A user's permissions are derived entirely from their assigned roles.
- Deactivating a user (`isActive: No`) should prevent them from logging in but preserve their records (e.g., sales history, repairs) for auditing purposes. Deleting users should be strongly discouraged or disallowed.

---
### **Page-Specific Views**
* [Go to User Management List Page Details](#user-management-list-page)

---
<br>

#### **User Management List Page Details** {#user-management-list-page}
* **Purpose:** To view, search, and manage all user accounts in the system.
* **Page URL:** `/admin/users`
* **Search Fields:**
    | Filter Name | Field Type |
    | :--- | :--- |
    | Search by User Type | Dropdown (e.g., "All", "Manager", "Technician") |
    | Search by Name | Text Input |
    | Search by Email | Text Input |
    | Search by Phone | Text Input |
    | Search by Mobile | Text Input |
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | ID | `id` |
    | Name | `name` |
    | Email | `email` |
    | Position | `roles` (formatted as a string) |
    | Mobile | `mobile` |
    | Branch | `branch.name` |
    | Active? | `isActive` |
    | Action | Link to the edit page for the user (Modifica). |

</details>



<details>
<summary><h3>4.9 E-Commerce Management</h3></summary>

This section details the features for managing products and orders for an external e-commerce website. This is distinct from the in-store POS (`Vendite Magazzino`) and general sales.

#### **Master Data Models & Rules**

**Master Data Table: E-Commerce Product**
* **AI Context:** This model represents a product available on the online store. It has its own pricing, stock counts, and descriptive information.

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `productId` | String | Yes | Unique identifier for the product. |
| `sku` | String | Yes | Stock Keeping Unit. Must be unique. Auto-generated on save. |
| `productName` | String | Yes | The public-facing name of the product. |
| `productCategory`| String (Reference)| Yes | The category the product belongs to (e.g., "RICAMBI", "BATTERIE"). |
| `brand` | String (Reference)| Yes | The product's brand. |
| `model` | String (Reference)| No | The product model it is associated with. |
| `isSolidDevice`| Boolean | Yes | Distinguishes parts/accessories from whole devices. Defaults to "No". |
| `purchasePrice`| Number | Yes | The cost to acquire one unit of this product. |
| `desktopPrice` | Number | Yes | The price for in-store (desktop) sales. |
| `onlinePrice` | Number | Yes | The price for e-commerce sales. |
| `color` | String (Reference)| No | The color of the product. |
| `stock` | Integer | Yes | The current general inventory level for this product. |
| `homeStock` | Integer | No | A separate stock count, likely for a central warehouse or "home" location. |
| `productImages`| Array of Files | No | Images of the product for the website. |
| `compatibleModels`| Array of Strings| No | A list of other models this product is compatible with. |
| `productMeta` | Array of Strings| No | Flags for marketing, like "Latest Product", "Top Selling", "On Offer". |
| `lastEdited` | DateTime | Yes | Timestamp of the last time the product was updated. |

**Common Business Rules:**
- When an e-commerce order is completed and payment is received, a corresponding `Transaction` **must** be created.
- The `stock` level for an `E-Commerce Product` **must** be automatically decremented when an order is fulfilled.

---
### **Page-Specific Views**
* [Go to Manage E-Commerce Products Page Details](#manage-ecommerce-products-page)
* [Go to Add New E-Commerce Product Page Details](#add-ecommerce-product-page)
* [Go to Home Stock List Page Details](#home-stock-list-page)

---
<br>

#### **Manage E-Commerce Products Page Details** {#manage-ecommerce-products-page}
* **Purpose:** To view, search, manage, and perform bulk operations on all products listed in the e-commerce system.
* **Page URL:** `/ecommerce/products`
* **Search Fields:** A comprehensive set of filters including `SKU`, `Product Name`, `Category`, `Brand`, `Model`, `Condition`, `Stock`, `Price`, and marketing tags.
* **Table Columns:** `SL#`, `Image`, `Product Name`, `Color`, `SKU`, `Category`, `Brand`, `Desk (Price)`, `Online (Price)`, `Purchase (Price)`, `Stock`, `Last Edited`, `Link` (Actions).
* **Bulk Operations:** Users can select multiple products via checkboxes and execute actions like "Download Selected Product".

<br>

#### **Add New E-Commerce Product Page Details** {#add-ecommerce-product-page}
* **Purpose:** To create a new product for the e-commerce store.
* **Page URL:** `/ecommerce/products/new`
* **Layout:** A multi-column form with various sections.
* **Fields on this Page:**
    | Field Label | Field Type | Required |
    | :--- | :--- | :--- |
    | Product | Text Input | Yes |
    | SKU | Text (Auto-generated) | - |
    | Product Category | Dropdown (with Add button) | Yes |
    | Is Solid Device? | Dropdown (Yes/No) | Yes |
    | IMEI Number | Text Input | No |
    | Purchase Price | Number Input (EUR) | Yes |
    | Desktop Price | Number Input (EUR) | Yes |
    | Online Price | Number Input (EUR) | Yes |
    | Box Number | Dropdown | No |
    | Color | Dropdown | No |
    | Stock | Number Input | No |
    | Product Images | File Upload | No |
    | Compatible Models | Autocomplete Text Input | No |
    | Home Stock | Text Input | No |
    | Product Description | Rich Text Editor | No |
    | Product Brand | Dropdown (with Add button) | Yes |
    | Product Model | Dropdown (with Add button) | No |
    | Product Condition | Dropdown | No |
    | Product Meta | Checkboxes (Latest, showOffer, Popular, Top Selling) | No |
    | Product Tags | Autocomplete Text Input | No |

<br>

#### **Home Stock List Page Details** {#home-stock-list-page}
* **Purpose:** To provide a simple, filter-less view of product stock levels, showing both general stock and a specific "Home Stock".
* **Page URL:** `/ecommerce/home-stock`
* **Filters:** None.
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | Title | `productName` |
    | Category | `productCategory` |
    | Product Brand | `brand` |
    | Model | `model` |
    | Stock | `stock` |
    | Home Stock | `homeStock` |
* **Other Features:** Allows exporting the full list to a CSV file.

</details>



<details>
<summary><h3>4.11 User & System Management</h3></summary>

This module covers the administration of users (employees, dealers), customers, and suppliers. Access to this section should be strictly limited to the `Administrator` and `Manager` roles.

#### **Master Data Models & Rules**

**Master Data Table: User**
* **AI Context:** This model represents an individual with access to the system. Each user is assigned one or more roles that define their permissions. This is a crucial entity for tracking employee actions throughout the system.

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the user. |
| `name` | String | Yes | The full name of the user. |
| `email` | String | Yes | The user's email address. Must be unique. |
| `loginName` | String | No | A separate username for login, if different from email. |
| `phone` | String | No | The user's primary phone number. |
| `mobile` | String | Yes | The user's mobile phone number. |
| `fax` | String | No | The user's fax number. |
| `roles` | Array of Strings| Yes | A list of assigned roles (e.g., "Manager", "Technician"). |
| `location` | String | No | The user's location/city. |
| `province` | String | No | The user's province. |
| `address` | String | No | The user's full address. |
| `postalCode` | String | No | The user's postal code. |
| `branchId` | String (Reference)| Yes | The primary branch the user is associated with. |
| `isActive` | Boolean | Yes | A flag to enable or disable the user's account. Defaults to "Yes". |

**Common Business Rules:**
- A user's permissions are derived entirely from their assigned roles.
- Deactivating a user (`isActive: No`) should prevent them from logging in but preserve their records for auditing purposes.

---
### **Page-Specific Views**
* [Go to User Management List Page Details](#user-management-list-page)
* [Go to Add User Page Details](#add-user-page)

---
<br>

#### **User Management List Page Details** {#user-management-list-page}
* **Purpose:** To view, search, and manage all user accounts in the system.
* **Page URL:** `/system/users`
* **Search Fields:**
    | Filter Name | Field Type |
    | :--- | :--- |
    | Search by User Type | Dropdown (e.g., "All", "Manager", "Technician") |
    | Search by Name | Text Input |
    | Search by Email | Text Input |
    | Search by Phone | Text Input |
    | Search by Mobile | Text Input |
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | ID | `id` |
    | Name | `name` |
    | Email | `email` |
    | Position | `roles` (formatted as a string) |
    | Mobile | `mobile` |
    | Branch | `branch.name` |
    | Active? | `isActive` |
    | Action | Link to the edit page for the user ("Modifica"). |

<br>

#### **Add User Page Details** {#add-user-page}
* **Purpose:** To create a new user account (employee, dealer, etc.) and assign roles.
* **Page URL:** `/system/users/new`
* **Layout:** A two-column form layout.
* **Fields on this Page:**
    | Field Label | Field Type | Required |
    | :--- | :--- | :--- |
    | Add Name | Text Input | Yes |
    | Email | Email Input | No |
    | Login Name | Text Input | No |
    | Phone | Text Input | No |
    | Mobile | Text Input | Yes |
    | Fax | Text Input | No |
    | Location | Text Input | No |
    | Province | Dropdown | No |
    | Address | Text Input | No |
    | Postal Code | Text Input | No |
    | Branch | Dropdown | Yes |
    | Roles | Checkboxes (Manager, FrontDesk Executive, Technician, Branch Dealer) | No |
    | Active? | Checkbox | No (Defaults to Yes) |

</details>



<details>
<summary><h3>4.12 Customer Management</h3></summary>

This module is responsible for managing the records of all customers. A "Customer" is distinct from a "User" (who is an employee or system operator). Customers are the external clients who bring in devices for repair or purchase items.

#### **Master Data Models & Rules**

**Master Data Table: Customer**
* **AI Context:** This model represents an individual or company that interacts with the business. It is linked to `Jobs` (Repairs) and `Sales`. It shares some fields with the `User` model but represents a different entity.

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the customer. |
| `name` | String | Yes | The full name or company name of the customer. |
| `email` | String | No | The customer's email address. |
| `phone` | String | No | The customer's primary phone number. |
| `mobile` | String | Yes | The customer's mobile phone number. |
| `customerType` / `role`| String | Yes | Defines the type of customer (e.g., "Desktop Customer"). |
| `branch` | String (Reference)| Yes | The primary branch the customer is associated with. |
| `isActive` | Boolean | Yes | A flag to indicate if the customer profile is active. Defaults to "Yes". |

**Common Business Rules:**
- A single customer record can be linked to multiple repairs (`Jobs`) and sales (`Transactions`).
- Searching for a customer should be fast and available from multiple points in the application (e.g., when creating a new repair or sale).

---
### **Page-Specific Views**
* [Go to Customers List Page Details](#customers-list-page)

---
<br>

#### **Customers List Page Details** {#customers-list-page}
* **Purpose:** To view, search, and manage all customer records in the system.
* **Page URL:** `/system/customers`
* **Search Fields:**
    | Filter Name | Field Type |
    | :--- | :--- |
    | Search by Customer Type| Dropdown (e.g., "All", "Desktop Customer") |
    | Search by Name | Text Input |
    | Search by Email | Text Input |
    | Search by Phone | Text Input |
    | Search by Mobile | Text Input |
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | ID | `id` |
    | Name | `name` |
    | Email | `email` |
    | Role | `customerType` |
    | Mobile | `mobile` |
    | Branch | `branch.name` |
    | Active? | `isActive` |
    | Action | Link to the edit page for the customer ("Modifica"). |

</details>



<details>
<summary><h3>4.12 Customer Management</h3></summary>

This module is responsible for managing the records of all customers. A "Customer" is distinct from a "User" (who is an employee or system operator). Customers are the external clients who bring in devices for repair or purchase items.

#### **Master Data Models & Rules**

**Master Data Table: Customer**
* **AI Context:** This model represents an individual or company that interacts with the business. It is linked to `Jobs` (Repairs) and `Sales`. It shares some fields with the `User` model but represents a different entity with additional business-specific fields like `VAT` and `Fiscal Code`.

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the customer. |
| `name` | String | Yes | The full name or company name of the customer. |
| `email` | String | No | The customer's email address. |
| `loginName` | String | No | A separate username for login, if applicable. |
| `phone` | String | No | The customer's primary phone number. |
| `mobile` | String | Yes | The customer's mobile phone number. |
| `fax` | String | No | The customer's fax number. |
| `fiscalCode` | String | No | The customer's Italian fiscal code. |
| `vat` | String | No | The customer's VAT number, for businesses. |
| `customerTypes` | Array of Strings| Yes | Defines the type of customer (e.g., "Dealer", "Desktop Customer", "Online Customer"). A customer can have multiple types. |
| `location` | String | No | The customer's location/city. |
| `province` | String | No | The customer's province. |
| `address` | String | No | The customer's full address. |
| `postalCode` | String | No | The customer's postal code. |
| `branch` | String (Reference)| Yes | The primary branch the customer is associated with. |
| `isActive` | Boolean | Yes | A flag to indicate if the customer profile is active. Defaults to "Yes". |

**Common Business Rules:**
- A single customer record can be linked to multiple repairs (`Jobs`) and sales (`Transactions`).
- Searching for a customer should be fast and available from multiple points in the application (e.g., when creating a new repair or sale).

---
### **Page-Specific Views**
* [Go to Customers List Page Details](#customers-list-page)
* [Go to Add Customer Page Details](#add-customer-page)

---
<br>

#### **Customers List Page Details** {#customers-list-page}
* **Purpose:** To view, search, and manage all customer records in the system.
* **Page URL:** `/system/customers`
* **Search Fields:**
    | Filter Name | Field Type |
    | :--- | :--- |
    | Search by Customer Type| Dropdown (e.g., "All", "Desktop Customer") |
    | Search by Name | Text Input |
    | Search by Email | Text Input |
    | Search by Phone | Text Input |
    | Search by Mobile | Text Input |
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | ID | `id` |
    | Name | `name` |
    | Email | `email` |
    | Role | `customerTypes` (formatted as a string) |
    | Mobile | `mobile` |
    | Branch | `branch.name` |
    | Active? | `isActive` |
    | Action | Link to the edit page for the customer ("Modifica"). |

<br>

#### **Add Customer Page Details** {#add-customer-page}
* **Purpose:** To create a new customer record and define their type(s).
* **Page URL:** `/system/customers/new`
* **Layout:** A two-column form layout.
* **Fields on this Page:**
    | Field Label | Field Type | Required |
    | :--- | :--- | :--- |
    | Add Name | Text Input | Yes |
    | Email | Email Input | No |
    | Login Name | Text Input | No |
    | Phone | Text Input | No |
    | Mobile | Text Input | Yes |
    | Fax | Text Input | No |
    | Fiscal Code | Text Input | No |
    | Location | Text Input | No |
    | Province | Dropdown | No |
    | Address | Text Input | No |
    | Postal Code | Text Input | No |
    | VAT | Text Input | No |
    | Branch | Dropdown | Yes |
    | Box Number | Dropdown (with Add button) | No |
    | Customer Types | Checkboxes (Dealer?, Desktop Customer?, Online Customer?) | Yes (at least one) |
    | Active? | Checkbox | No (Defaults to Yes) |

</details>



<details>
<summary><h3>4.13 Supplier Management</h3></summary>

This module is for managing the records of all suppliers. A "Supplier" is an external entity (person or company) from whom products, spare parts, or used devices are purchased.

#### **Master Data Models & Rules**

**Master Data Table: Supplier**
* **AI Context:** This model represents a business or individual that provides goods to the company. It is a critical link for tracking `Product Purchases` and the origin of `Tracked Devices`.

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the supplier record. |
| `companyName` | String | Yes | The legal or trading name of the supplier. |
| `contactName` | String | No | The name of the primary contact person at the company. |
| `address` | String | No | The physical address of the supplier. |
| `email` | String | No | The supplier's contact email address. |
| `phone` | String | No | The supplier's contact phone number. |

**Common Business Rules:**
- Each supplier can be linked to multiple `Product Purchases` and `Tracked Devices`.
- The system should prevent the deletion of a supplier who has associated transaction records to maintain data integrity.

---
### **Page-Specific Views**
* [Go to Suppliers List Page Details](#suppliers-list-page)

---
<br>

#### **Suppliers List Page Details** {#suppliers-list-page}
* **Purpose:** To view, search, and manage all supplier records in the system.
* **Page URL:** `/system/suppliers`
* **Features:**
    * A prominent "Add Supplier" button to navigate to the creation form.
    * A global search bar to filter the list.
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | (Row Number) | A sequential number for the current view. |
    | Company | `companyName` |
    | Contact Name | `contactName` |
    | Address | `address` |
    | Email | `email` |
    | Phone | `phone` |
    | Actions | Links to `Edit`, `View`, and `Transactions` for the supplier. |

</details>



<details>
<summary><h3>4.13 Supplier Management</h3></summary>

This module is for managing the records of all suppliers. A "Supplier" is an external entity (person or company) from whom products, spare parts, or used devices are purchased.

#### **Master Data Models & Rules**

**Master Data Table: Supplier**
* **AI Context:** This model represents a business or individual that provides goods to the company. It is a critical link for tracking `Product Purchases` and the origin of `Tracked Devices`.

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the supplier record. |
| `supplierName` | String | Yes | The legal or trading name of the supplier. |
| `contactName` | String | No | The name of the primary contact person. |
| `address` | Text | No | The physical address of the supplier. |
| `mobile` | String | No | The supplier's mobile number. |
| `email` | String | No | The supplier's contact email address. |
| `phone` | String | Yes | The supplier's primary contact phone number ("Telefono"). |
| `website` | String | No | The supplier's website URL. |
| `skype` | String | No | The supplier's Skype ID. |
| `fax` | String | No | The supplier's fax number. |
| `vatNumber` | String | No | The supplier's VAT number ("P. IVA"). |
| `notes` | Text | No | General notes about the supplier. |

**Common Business Rules:**
- Each supplier can be linked to multiple `Product Purchases` and `Tracked Devices`.
- The system should prevent the deletion of a supplier who has associated transaction records to maintain data integrity.

---
### **Page-Specific Views**
* [Go to Suppliers List Page Details](#suppliers-list-page)
* [Go to Add Supplier Page Details](#add-supplier-page)

---
<br>

#### **Suppliers List Page Details** {#suppliers-list-page}
* **Purpose:** To view, search, and manage all supplier records in the system.
* **Page URL:** `/system/suppliers`
* **Features:**
    * A prominent "Add Supplier" button to navigate to the creation form.
    * A global search bar to filter the list.
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | Company | `supplierName` |
    | Contact Name | `contactName` |
    | Address | `address` |
    | Email | `email` |
    | Phone | `phone` |
    | Actions | Links to `Edit`, `View`, and `Transactions` for the supplier. |

<br>

#### **Add Supplier Page Details** {#add-supplier-page}
* **Purpose:** To create a new record for a supplier. The page shows the add form at the top and the list of existing suppliers at the bottom.
* **Page URL:** `/system/suppliers/new`
* **Layout:** A two-column form layout above a data table.
* **Fields on this Page:**
    | Field Label | Field Type | Required |
    | :--- | :--- | :--- |
    | Add Supplier | Text Input | Yes |
    | Contact Name | Text Input | No |
    | Address | Text Area | No |
    | Mobile | Text Input | No |
    | Email | Email Input | No |
    | Website | URL Input | No |
    | Skype | Text Input | No |
    | Telefono (Phone) | Text Input | Yes |
    | Fax | Text Input | No |
    | P. IVA (VAT Number)| Text Input | No |
    | Note | Text Area | No |

</details>



<details>
<summary><h3>4.14 Product Purchase Management</h3></summary>

This module is for recording and managing the purchase of inventory (products and spare parts) from suppliers. It is a critical component for tracking costs and updating stock levels.

#### **Master Data Models & Rules**

**Master Data Table: Product Purchase**
* **AI Context:** This model represents a single purchase event from a supplier, which may include one or more products. It serves as a foundational record for both inventory and accounting.

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the purchase record. |
| `supplierId` | String (Reference)| Yes | The supplier from whom the products were purchased. |
| `invoiceNumber`| String | Yes | The invoice number provided by the supplier. |
| `invoiceDate` | Date | Yes | The date on the supplier's invoice. |
| `paymentDate` | Date | Yes | The date the payment for the purchase was made. |
| `purchaseTotal`| Number | Yes | The total amount of the invoice. |
| `totalPaid` | Number | Yes | The amount paid against the invoice. |
| `items` | Array of Objects| Yes | A list of products included in this purchase. Each item should have `productId`, `quantity`, and `purchasePrice`. |
| `savedByUserId`| String (Reference)| Yes | The user who entered the purchase record. |
| `createdDate` | DateTime | Yes | The timestamp when the record was created in the system. |

**Common Business Rules:**
- When a `Product Purchase` is saved, it **must** create a corresponding "Expense" record in the master `Transaction` table with `expense: purchaseTotal`.
- The `stock` level for each product in the `items` array **must** be increased by the purchased quantity upon saving.
- The system must track the payment status (e.g., Unpaid, Partially Paid, Paid) by comparing `purchaseTotal` and `totalPaid`.

---
### **Page-Specific Views**
* [Go to List of Products Purchased Page Details](#list-of-products-purchased-page)

---
<br>

#### **List of Products Purchased Page Details** {#list-of-products-purchased-page}
* **Purpose:** To view, search, and manage all inventory purchase records.
* **Page URL:** `/expenses/product-purchases`
* **Search Fields:**
    | Filter Name | Field Type |
    | :--- | :--- |
    | Supplier | Dropdown |
    | Invoice Number | Text Input |
    | Created Date From | Date Picker |
    | Created Date To | Date Picker |
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | ID | `id` |
    | Created Date | `createdDate` |
    | Payment Date | `paymentDate` |
    | Invoice Date | `invoiceDate` |
    | Supplier | `supplier.supplierName` |
    | Invoice Number | `invoiceNumber` |
    | Purchase Total | `purchaseTotal` |
    | Total Paid | `totalPaid` (Visually indicates status) |
    | Saved By | `user.name` |
    | Actions | Links for `Return`, `View`, `PDF`, and `Edit`. |

</details>



<details>
<summary><h3>4.14 Product Purchase Management</h3></summary>

This module is for recording and managing the purchase of inventory (products and spare parts) from suppliers. It is a critical component for tracking costs and updating stock levels.

#### **Master Data Models & Rules**

**Master Data Table: Product Purchase**
* **AI Context:** This model represents a single purchase event from a supplier, which may include one or more products. It serves as a foundational record for both inventory and accounting.

| Field Name | Data Type | Required | Description / Master Rule |
| :--- | :--- | :--- | :--- |
| `id` | String | Yes | Unique identifier for the purchase record. |
| `supplierId` | String (Reference)| Yes | The supplier from whom the products were purchased. |
| `invoiceNumber`| String | Yes | The invoice number provided by the supplier. |
| `invoiceDate` | Date | Yes | The date on the supplier's invoice. |
| `paymentDate` | Date | Yes | The date the payment for the purchase was made. |
| `purchaseTotal`| Number | Yes | The total gross amount of the invoice before discounts. |
| `discount` | Number | No | Any discount applied to the purchase total. |
| `toPay` | Number | Yes | The final amount due after discount (`purchaseTotal` - `discount`). |
| `paid` | Number | Yes | The amount paid against the invoice. |
| `paymentMethodId`| String (Reference)| Yes | The method used for payment. |
| `paymentReceipt` | String | No | A reference number for the payment transaction. |
| `orderNote` | Text | No | General notes about the purchase. |
| `items` | Array of Objects| Yes | A list of products included in this purchase. Each item should have `productId`, `quantity`, and `purchasePrice`. |
| `savedByUserId`| String (Reference)| Yes | The user who entered the purchase record. |
| `createdDate` | DateTime | Yes | The timestamp when the record was created in the system. |

**Common Business Rules:**
- When a `Product Purchase` is saved, it **must** create a corresponding "Expense" record in the master `Transaction` table with `expense: paid`.
- The `stock` level for each product in the `items` array **must** be increased by the purchased quantity upon saving.

---
### **Page-Specific Views**
* [Go to List of Products Purchased Page Details](#list-of-products-purchased-page)
* [Go to Add New Purchases Page Details](#add-new-purchases-page)

---
<br>

#### **List of Products Purchased Page Details** {#list-of-products-purchased-page}
* **Purpose:** To view, search, and manage all inventory purchase records.
* **Page URL:** `/expenses/product-purchases`
* **Search Fields:**
    | Filter Name | Field Type |
    | :--- | :--- |
    | Supplier | Dropdown |
    | Invoice Number | Text Input |
    | Created Date From / To | Date Picker |
* **Table Columns:**
    | Column Header | Data Source Field |
    | :--- | :--- |
    | ID | `id` |
    | Created Date | `createdDate` |
    | Payment Date | `paymentDate` |
    | Invoice Date | `invoiceDate` |
    | Supplier | `supplier.supplierName` |
    | Invoice Number | `invoiceNumber` |
    | Purchase Total | `purchaseTotal` |
    | Total Paid | `paid` (Visually indicates status) |
    | Saved By | `user.name` |
    | Actions | Links for `Return`, `View`, `PDF`, and `Edit`. |

<br>

#### **Add New Purchases Page Details** {#add-new-purchases-page}
* **Purpose:** To create a detailed record of a new product purchase, including line items and payment information.
* **Page URL:** `/expenses/product-purchases/new`
* **Layout:** A complex multi-column layout with a section for adding line items and another for invoice/payment details.
* **Fields on this Page:**
    | Field Label | Field Type | Required | Section |
    | :--- | :--- | :--- | :--- |
    | Product | Autocomplete Text Input | Yes | Line Item |
    | Quantity | Number Input | Yes | Line Item |
    | Purchase Price | Number Input | Yes | Line Item |
    | Desktop Price | Number Input | No | Line Item |
    | Online Price | Number Input | No | Line Item |
    | **(Add Product Button)** | Button | - | Line Item |
    | Supplier | Dropdown (with Add button) | Yes | Details |
    | Invoice Number | Text Input | Yes | Details |
    | Invoice Date | Date Picker | Yes | Details |
    | Payment Date | Date Picker | Yes | Details |
    | Purchase Total | Number Input | Yes | Payment |
    | Discount | Number Input | No | Payment |
    | To Pay | Number Input (Read-only) | Yes | Payment |
    | Paid | Number Input | Yes | Payment |
    | Payment Method | Dropdown (with Add button) | Yes | Payment |
    | Payment Receipt Number| Text Input | No | Payment |
    | Order Note | Text Area | No | Payment |

</details>