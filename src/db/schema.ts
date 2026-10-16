
import { boolean, decimal, integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./auth-schema";


// tables

export const product = pgTable("products",{
  id : text("id").primaryKey(),
  slug : text("slug").notNull().unique(),
  name : text("name").notNull(),
  description : text("description"),
  category : text("category").notNull(),
  unit : text("unit").notNull(),
  price : decimal("price", { precision: 10, scale: 2 }).notNull(),
  old_price : decimal("old_price", { precision: 10, scale: 2 }),
  stock : integer("stock").notNull().default(0),

  createdAt : timestamp("created_at").defaultNow().notNull(),
  updatedAt : timestamp("updated_at").defaultNow().notNull(),
})


// product images 
export const productImage = pgTable("product_images",{
  id : text("id").primaryKey(),
  productId : text("product_id").notNull().references(() => product.id),
  imageUrl : text("image_url").notNull(),
  publicId : text("public_id").notNull(),
  isMain : boolean("is_main").default(false).notNull(),
  createdAt : timestamp("created_at").defaultNow().notNull(),
})

  




// address modal 
export const address = pgTable("address",{
  id : text("id").primaryKey(),
  userId : text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  firstName : text("first_name").notNull(),
  lastName : text("last_name").notNull(),
  phone : text("phone").notNull(),
  street : text("street").notNull(),
  city : text("city").notNull(),
  state : text("state").notNull(),
  postalCode : text("postal_code").notNull(),
  country : text("country").notNull(),
  isDefault : boolean("is_default").default(false).notNull(),

  createdAt : timestamp("created_at").defaultNow().notNull(),
  updatedAt : timestamp("updated_at").defaultNow().notNull(),
});


// Orders table 

export const order = pgTable("order",{
  id : text("id").primaryKey(),
  orderId : text("order_id").notNull().unique(), 
  userId : text("user_id").notNull().references(() => user.id, { onDelete: "cascade" }),
  addressId : text("address_id").notNull().references(() => address.id, { onDelete: "cascade" }),
  totalAmount : decimal("total_amount", { precision: 10, scale: 2 }).notNull(),

  paymentMethod : text("payment_method").notNull(),
  paymentStatus : text("payment_status").notNull().default("pending"),
  orderStatus : text("order_status").notNull().default("pending"),

  stripePaymentIntentId : text("stripe_payment_intent_id"),
  stripeCheckoutSessionId : text("stripe_checkout_session_id"),


  createdAt : timestamp("created_at").defaultNow().notNull(),
  updatedAt : timestamp("updated_at").defaultNow().notNull(),
});





// Orders Item 

export const orderItems = pgTable("order_items",{
  id : text("id").primaryKey(),
  orderId : text("order_id").notNull().references(() => order.id, { onDelete: "cascade" }),
  productId : text("product_id").notNull().references(() => product.id, { onDelete: "cascade" }),
  quantity : integer("quantity").notNull(),
  price : decimal("price", { precision: 10, scale: 2 }).notNull(),
  
  createdAt : timestamp("created_at").defaultNow().notNull(),
  
}); 




// Realtionships

// product has many product images
// product has many order items

export const productRelations = relations(product, ({ many }) => ({
  images: many(productImage),
  orderItems: many(orderItems),
}));

// productimage belongs to one product
export const productImageRelations = relations(productImage, ({ one }) => ({
  product: one(product, {
    fields: [productImage.productId],
    references: [product.id],
  }),
}));


// address relations
// one user has many addresses with orders
export const addressRelations = relations(address, ({ one,many }) => ({
  user: one(user, {
    fields: [address.userId],
    references: [user.id],
  }),
  orders: many(order),
}));


// order relations
// one user has many orders
// one address has many orders
// one order has many order items
export const orderRelations = relations(order, ({ one,many }) => ({
  user: one(user, {
    fields: [order.userId],
    references: [user.id],
  }),
  address: one(address, {
    fields: [order.addressId],
    references: [address.id],
  }),
  items: many(orderItems),
}));
 

// order item relations
// one order has many order items
// one product has many order items
export const orderItemRelations = relations(orderItems, ({ one ,many}) => ({
  order: one(order, {
    fields: [orderItems.orderId],
    references: [order.id],
  }),
  product: one(product, {
    fields: [orderItems.productId],
    references: [product.id],
  }),
}));
