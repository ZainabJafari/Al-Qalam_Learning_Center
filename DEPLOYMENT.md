# Deployment Checklist

This project has two deployable parts:

- `AlQalamLearningCenter.Web`: Angular frontend.
- `AlQalamLearningCenter.Api`: ASP.NET Core API for donations, Stripe, and database access.

## Step 1: Production Config

Frontend:

- Development API URL lives in `AlQalamLearningCenter.Web/src/environments/environment.ts`.
- Production API URL lives in `AlQalamLearningCenter.Web/src/environments/environment.prod.ts`.
- Before publishing frontend, replace `https://REPLACE_WITH_API_DOMAIN/api` with the real API URL.

API:

- Local defaults live in `AlQalamLearningCenter.Api/appsettings.json`.
- Production secrets must be set in the hosting provider environment variables, not committed to Git.
- Use `AlQalamLearningCenter.Api/appsettings.Production.example.json` only as a safe template.

Required API production settings:

- `ConnectionStrings__DefaultConnection`
- `Stripe__SecretKey`
- `Stripe__WebhookSecret`
- `Stripe__SuccessUrl`
- `Stripe__CancelUrl`
- `Cors__AllowedOrigins__0`

## Step 2: Recommended Hosting Order

1. Create the production database.
2. Deploy the API.
3. Update Stripe URLs and webhook to point at the API/frontend production domains.
4. Update the Angular production API URL.
5. Deploy the frontend.
6. Test donation flow in Stripe test mode.
7. Switch Stripe to live mode only after the test flow works.
