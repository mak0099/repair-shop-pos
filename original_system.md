# Existing System Documentation: Repair Shop Management System

## 1. Basic Information

* **System Name:** Repair Shop Management System
* **Objective:** To create a comprehensive guide that documents the features, user interface, and workflows of the current, live application. This document will serve as a reference for understanding the existing system's functionality.

---

## 2. Main Navigation Menu

The following is the hierarchical structure of the main navigation menu. Each link navigates to the corresponding documentation section within this file.

* **Home**
    * [Frontdesk](#page-frontdesk)
    * [Online](#page-online)
    * [E-Commerce Dashboard](#page-e-commerce-dashboard)
    * [Branch Products List](#page-branch-products-list)
* **Acceptances** (Repairs)
    * [Acceptance (Add New)](#page-acceptance-add)
    * [Search](#page-acceptance-search)
    * [Acceptance List](#page-acceptance-list)
    * [Acceptance Profit/Loss](#page-acceptance-profitloss)
    * [Deleted Acceptance](#page-deleted-acceptance)
    * [Acceptance Generate Refund](#page-acceptance-generate-refund)
* **Search** (Direct link to [Acceptance Search](#page-acceptance-search))
* **Sale/ Order System**
    * [Add General Sale](#page-add-general-sale)
    * **Back Office E-Commerce Sale**
        * [Add E-Commerce Sale](#page-add-e-commerce-sale)
        * [Back Office E-Commerce Sale List](#page-back-office-e-commerce-sale-list)
    * **Order Spare parts**
        * [Submit Order Parts](#page-submit-order-parts)
        * [List of Order Parts](#page-list-of-order-parts)
    * **Online Sale**
        * [All Online Orders](#page-all-online-orders)
        * [Pending Orders](#page-pending-orders)
        * [Payment Received Orders](#page-payment-received-orders)
        * [Waiting to Deliver Orders](#page-waiting-to-deliver-orders)
        * [Completed Orders](#page-completed-orders)
* **Expenses**
    * **Product Purchase**
        * [Search](#page-product-purchase-search)
        * [Add Product Purchase](#page-add-product-purchase)
    * **Expenses (General)**
        * [Search](#page-general-expenses-search)
        * [Add New General Expense](#page-add-new-general-expense)
* **Options**
    * **Managerial Tasks**
        * [Transactions](#page-transactions)
        * [Khata Online](#page-khata-online)
        * [DDT Viewer](#page-ddt-viewer)
        * [DDT Generator](#page-ddt-generator)
        * [Attendances](#page-attendances)
        * [Employee Performance](#page-employee-performance)
* **System**
    * [User Management](#page-user-management)
    * [Add User](#page-add-user)
    * [Customers](#page-customers)
    * [Add Customer](#page-add-customer)
    * [Suppliers](#page-suppliers)
    * [Add Supplier](#page-add-supplier)
* **Tracking Device**
    * [Tracking Devices List](#page-tracking-devices-list)
    * [Add Tracking Device](#page-add-tracking-device)
* **E-Commerce Dashboard**
    * [Manage Products](#page-manage-products)
    * [Add Product](#page-add-product)
    * [Home Stock List](#page-home-stock-list)

---
---

## 3. Module: Acceptances

This module is responsible for creating, tracking, and managing all customer repair jobs.

### Page: Acceptance (Add)

#### 🟦 1. Basic Information
| Field | Description |
| :--- | :--- |
| **Page ID:** | `P-001` |
| **Page Name:** | Add Acceptance |
| **Page Type:** | Create Form |
| **Page URL:** | `/en/frontdesk/acceptance/add` |
| **Purpose:** | To create a new repair job record when a customer brings in a device. This is the starting point of the entire repair workflow. |
| **Accessible by:**| Technician, FrontDesk Executive, Manager, Admin |

---
#### 🟧 2. Input Fields
| # | Label | Field Name | Type | Required | Default | Behavior / Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Customer Name** | `customer_name` | Searchable Dropdown | Yes | - | Links to `Customers`. `+` button opens a modal to add a new customer. |
| 2 | **Estimated Price** | `estimated_price` | Number | No | Empty | Manual input. Placeholder: "Enter the estimated price". |
| 3 | **Brand** | `brand` | Searchable Dropdown | Yes | - | Links to `Brands`. `+` button opens a modal to add a new brand. |
| 4 | **Model** | `model` | Searchable Dropdown | Yes | - | Links to `Models`, filtered by selected Brand. `+` button to add a new model. |
| 5 | **Color** | `color` | Searchable Dropdown | No | - | Links to `Colors`. `+` button to add a new color. |
| 6 | **Accessories** | `accessories` | Text Input | No | Empty | Manual input for items like chargers, cases. |
| 7 | **Device Type** | `device_type` | Dropdown | Yes | - | Configurable list (e.g., "SMARTPHONE"). |
| 8 | **Current Status** | `current_status` | Dropdown | Yes | `IN REPAIR` | Configurable list of repair statuses. |
| 9 | **Defect Description**| `defect_description`| Text Area | No | Empty | Placeholder: "Describe the defect presented by the device". |
| 10 | **Notes** | `notes` | Text Area | No | Empty | Placeholder: "Enter the condition of the device". |
| 11 | **Created Date** | `created_date` | Date Picker | Yes | Current Date | Auto-populates. |
| 12 | **IMEI/Serial No** | `imei` | Text Input | Yes | Empty | Placeholder: "Enter IMEI". |
| 13 | **Secondary IMEI** | `secondary_imei` | Text Input | No | Empty | Placeholder: "Enter secondary IMEI". |
| 14 | **Technician** | `technician_id` | Dropdown | Yes | - | Links to `Users` with "Technician" role. `+` button to add a new user. |
| 15 | **Warranty** | `warranty` | Dropdown | No | `Choose an option` | Configurable list. `+` button to add new options. |
| 16 | **Replacement Device**|`replacement_device`| Text Input | No | Empty | Records details of a loaner device. |
| 17 | **Dealer** | `dealer` | Text Input | No | Empty | For B2B partner reference. |
| 18 | **Price Offered** | `price_offered` | Number | No | `XXXXX` | Price to buy the device from the customer (trade-in). |
| 19 | **Reserved Notes** | `reserved_notes` | Text Area | No | Empty | Placeholder: "Enter reserved notes". |
| 20 | **Important Information**|`important_information`| Radio (Yes/No) | Yes | No | Flag for critical notes. |
| 21 | **Pin Unlock** | `pin_unlock` | Radio (Yes/No) | Yes | No | Indicates if the device PIN is provided. |
| 22 | **Pin Unlock Number**| `pin_unlock_number` | Text Input | No | Hidden | **Hidden by default.** Becomes visible only if "Pin Unlock" is set to "Yes". |
| 23 | **Urgent** | `urgent` | Radio (Yes/No) | Yes | No | Marks the job as high priority. |
| 24 | **Urgent Date** | `urgent_date` | Date Picker | No | Hidden | **Hidden by default.** Becomes visible only if "Urgent" is set to "Yes". |
| 25 | **Quote** | `quote` | Radio (Yes/No) | Yes | No | Indicates if a formal quote is needed before repair. |
| 26 | **Photo 1** | `photo_1` | File Upload | No | - | For uploading an image of the device. |
| 27 | **Photo 2** | `photo_2` | File Upload | No | - | For uploading an image of the device. |
| 28 | **Photo 3** | `photo_3` | File Upload | No | - | For uploading an image of the device. |
| 29 | **Photo 4** | `photo_4` | File Upload | No | - | For uploading an image of the device. |
| 30 | **Photo 5** | `photo_5` | File Upload | No | - | For uploading an image of the device. |

---
#### 🟩 4. Buttons & Actions
| Button Name | Type | Function / Behavior |
| :--- | :--- | :--- |
| **Save** | Submit | Validates the form. On success, creates a new `Job` record and redirects to the Edit Acceptance page. |

---
#### 🟦 5. Expected Outputs
1.  A new **Job (Acceptance)** record is created in the database.
2.  An **Acceptance Number** (e.g., `41604-2025`) is generated and prominently displayed on the next page.
3.  The user is redirected to the **Edit Acceptance** page for the newly created job.

---
#### 🟪 6. Validation Rules
| Field | Rule / Description | Error Message (Implied) |
| :--- | :--- | :--- |
| `customer_name` | Must not be empty. | This field is required. |
| `brand` | Must not be empty. | This field is required. |
| `model` | Must not be empty. | This field is required. |
| `imei`| Must not be empty. | This field is required. |
| `technician_id` | Must not be empty. | This field is required. |

---
#### 🟫 7. Workflow
1.  User clicks **Acceptances > Acceptance (Add New)** from the main menu.
2.  The user fills in the form with all required customer and device details.
3.  The user clicks the **"Save"** button.
4.  The system validates required fields. Upon success, it creates the record and redirects the user to the "Edit Acceptance" page, which now shows the newly generated `Acceptance Number`.

---
#### 🟪 9. Screenshot
* `image_c2946b.png`

---
[Back to Main Navigation Menu](#2-main-navigation-menu)

### Page: Acceptance (Search)

#### 🟦 1. Basic Information
| Field | Description |
| :--- | :--- |
| **Page ID:** | `P-002` |
| **Page Name:** | Search (Cerca) |
| **Page Type:** | Search / List |
| **Page URL:** | `/en/frontdesk/acceptances` |
| **Purpose:** | To provide a powerful, multi-filter interface for finding specific repair jobs based on a wide range of criteria. |
| **Accessible by:**| Technician, FrontDesk Executive, Manager, Admin |

---
#### 🟨 3. Filters / Search
This page is dominated by a comprehensive search form.

| Label | Field Name | Type | Logic | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Customer Name** | `customer_name` | Searchable Dropdown | Exact Match | Searches from the `Customers` table. |
| **Acceptance Number**| `acceptance_number` | Text Input | Contains | Searches for a partial or full acceptance number. |
| **Acceptance Year** | `acceptance_year` | Text Input | Exact Match | Filters jobs created in a specific year. |
| **Mobile** | `mobile` | Text Input | Contains | Searches by customer's mobile number. |
| **Brand** | `brand` | Dropdown | Exact Match | Filters by device brand. |
| **Model** | `model` | Dropdown | Exact Match | Filters by device model. |
| **IMEI/Serial No** | `imei` | Text Input | Contains | Searches by the device's IMEI or serial number. |
| **Created Date From**| `created_date_from` | Date Picker | Greater than or equal to | Sets the start of a date range for when the job was created. |
| **Created Date To** | `created_date_to` | Date Picker | Less than or equal to | Sets the end of a date range. |
| **Device Current Status**| `current_status` | Dropdown | Exact Match | Filters by the current repair status. |
| **Technician** | `technician` | Dropdown | Exact Match | Filters by the assigned technician. |
| **Created By** | `created_by` | Dropdown | Exact Match | Filters by the user who created the job record. |
| **Dealer** | `dealer` | Dropdown | Exact Match | Filters by the associated dealer. |
| **Branch** | `branch` | Dropdown | Exact Match | Filters by the branch where the job was created. |
| **Delivery Date** | `delivery_date` | Date Picker | Exact Match | Filters by the date the device was returned to the customer. |

---
#### 🟩 4. Buttons & Actions
| Button Name | Type | Function / Behavior |
| :--- | :--- | :--- |
| **Search** | Submit Button | Executes the search query using the provided filter criteria and updates the results table below. |
| **Reset** | Reset Button | Clears all the filter fields to their default state. |

---
#### 🟦 5. Expected Outputs
* The primary output is a paginated data table displaying the repair jobs that match the filter criteria.
* The table shows a summary of the total number of entries found (e.g., "Showing 1 to 100 of 41,454 entries").

**Table Columns**
| Column Header | Data Source | Notes |
| :--- | :--- | :--- |
| **Number** | `acceptanceNumber` | Links to the "Edit Acceptance" page for that job. |
| **Customer** | `customer.name` | Links to the customer's details page. |
| **Created Date**| `createdDate` | |
| **Device Type**| `deviceType` | |
| **Brand** | `brand.name` | |
| **Model** | `model.name` | |
| **Status Type**| `statusType` | |
| **Current Status**| `currentStatus` | |
| **Technician** | `technician.name` | |
| **Created By** | `createdBy.name` & `branch.name` | |
| **Delivery Date**| `deliveryDate` | |
| **Estimated Price**| `estimatedPrice` | |

---
#### 🟫 7. Workflow
1.  User navigates to the **Acceptances > Search** page.
2.  User enters values into one or more filter fields.
3.  User clicks the **"Search"** button.
4.  The data table below the form reloads, displaying only the records that match the search criteria.
5.  User can click on an `Acceptance Number` or `Customer` in the results to navigate to their respective details pages.
6.  User can use the pagination controls at the bottom to navigate through multiple pages of results.

---
#### 🟪 9. Screenshot
* `image_cd724a.png`

---
[Back to Main Navigation Menu](#main-navigation-menu)