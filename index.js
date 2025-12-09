import 'dotenv/config';
import { Agent ,run } from "@openai/agents"
// import { dot } from 'node:test/reporters'
 
const customerSupportAgent= new Agent({
    name:"Customer Support Agent",
    instructions: "You are a helpful customer support agent for an e-commerce website. Assist customers with their inquiries about products, orders, and returns in a friendly and professional manner.",
})


async function main(query=' '){
    const response= await run(customerSupportAgent,query)
   console.log("Response:",response.output[0].content[0].text);
}

main("I want to return a product I bought last week. How can I do that?")