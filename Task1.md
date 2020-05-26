# Task 1 Code Review

## What is done well?

The way the project is set up. The separation between the UI logic and the business logic to decouple the UI from the technology being used.The grouping of libraries into logical feature groups to allow for easier scalability.

## What would you change?

Instead of directly calling the external API from the Angular App, I would make that external API call from the stocks-api. The current implementation exposes the apiKey in the network call and can be easily viewed from the network tab which could lead to some security issues.

## Are there any code smells or problematic implementations?

The chart component has bound the ngIf directive to property data, which in the component is written data$ and could cause issues with building or running the application, additionally even if the binding is to the correct variable the binding being to a subscription that could exist before the data for the chart is available could cause problems with the google charts component trying to create a chart with no data. Although a proxy is set up to send calls to localhost:3333, no API call matches the pattern and the server is currently unused.
