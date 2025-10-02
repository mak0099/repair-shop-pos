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