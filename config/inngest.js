import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";

export const inngest = new Inngest({ id: "quickcart-next" });

// Helper to make sure we only return plain JSON to Inngest
const clean = (data) => (data ? JSON.parse(JSON.stringify(data)) : null);

export const syncUserCreation = inngest.createFunction(
    { id: 'sync-user-from-clerk' },
    { event: 'clerk/user.created' },
    async (ctx) => { // Use 'ctx' instead of destructuring to prevent ReferenceErrors
        const { event, step } = ctx;
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`,
            imageUrl: image_url
        };

        await step.run("save-user-to-db", async () => {
            await connectDB();
            const user = await User.create(userData);
            return clean(user); // Critical: Return plain JSON only
        });
    }
);

export const syncUserUpdation = inngest.createFunction(
    { id: 'update-user-from-clerk' },
    { event: 'clerk/user.updated' },
    async (ctx) => {
        const { event, step } = ctx;
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`,
            imageUrl: image_url
        };

        await step.run("update-user-db", async () => {
            await connectDB();
            const user = await User.findByIdAndUpdate(id, userData, { new: true }).lean();
            return clean(user);
        });
    }
);

export const syncUserDeletion = inngest.createFunction(
    { id: 'delete-user-with-clerk' },
    { event: 'clerk/user.deleted' },
    async (ctx) => {
        const { event, step } = ctx;
        const { id } = event.data;

        await step.run("delete-user-db", async () => {
            await connectDB();
            await User.findByIdAndDelete(id).exec();
            return { deleted: true, id }; // Return a simple object
        });
    }
);
