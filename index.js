import 'dotenv/config';
import axios from 'axios';
import { Agent ,run,tool } from "@openai/agents"
import { z } from "zod";
// import { dot } from 'node:test/reporters'
 
const getWeatherInfo=tool({
    name:"getWeatherInfo",
    description:" Get the current weather information by the city name",
    parameters:z.object({city:z.string().describe("City Name")}),
    async execute({city}){
        console.log("Executing the function getWeatherInfo with city:",city);
        const url=`https://wttr.in/${city.toLowerCase()}?format=%c+%t`;
        const response= await axios.get(url);
        return `The current weather in ${city} is ${response.data}`;

    }
})
const customerSupportAgent= new Agent({
    name:"Customer Support Agent",
    tools:[getWeatherInfo],
    instructions: "You are a helpful customer support agent for an e-commerce website. Assist customers with their inquiries about products, orders, and returns in a friendly and professional manner.",
})


async function main(query=' '){
    const response= await run(customerSupportAgent,query)
   console.log("Response:",response.finalOutput);
}

main(" What is the current weather of Mumbai ,goa and delhi in Celsius")