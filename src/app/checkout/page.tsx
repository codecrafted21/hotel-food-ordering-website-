import CheckoutClientPage from './checkout-client-page';

export default function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <h1 className="text-4xl font-headline font-bold text-center mb-10">
        Confirm Your Order
      </h1>
      <CheckoutClientPage />
    </div>
  );
}
