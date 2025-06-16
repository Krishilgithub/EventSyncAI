import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/solid";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for trying out EventSync AI",
    features: [
      "Up to 3 events per month",
      "Basic scheduling features",
      "Email notifications",
      "Calendar integration",
      "Basic analytics",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$15",
    period: "/month",
    description: "Best for growing teams and businesses",
    features: [
      "Unlimited events",
      "Advanced scheduling",
      "AI-powered suggestions",
      "Custom branding",
      "Advanced analytics",
      "Priority support",
      "Team collaboration",
      "API access",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with specific needs",
    features: [
      "Everything in Pro",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "Custom reporting",
      "Advanced security",
      "Training sessions",
      "Custom development",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl font-bold text-dark mb-4"
          >
            Simple, Transparent Pricing
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Choose the perfect plan for your needs. All plans include a 14-day
            free trial.
          </motion.p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`card hover-scale ${
                plan.popular
                  ? "border-2 border-primary relative"
                  : "border border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-white">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-2xl font-bold text-dark mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center mb-4">
                  <span className="text-4xl font-bold text-dark">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckIcon className="h-6 w-6 text-primary flex-shrink-0 mr-2" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full btn ${
                  plan.popular
                    ? "btn-primary"
                    : "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white"
                }`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <h2 className="text-3xl font-bold text-center text-dark mb-12">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                question: "Can I change plans later?",
                answer:
                  "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.",
              },
              {
                question: "What payment methods do you accept?",
                answer:
                  "We accept all major credit cards, PayPal, and bank transfers for annual plans.",
              },
              {
                question: "Is there a long-term contract?",
                answer:
                  "No, all plans are billed monthly and you can cancel at any time.",
              },
              {
                question: "Do you offer refunds?",
                answer:
                  "Yes, we offer a 14-day money-back guarantee if you're not satisfied with our service.",
              },
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card"
              >
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-20 text-center"
        >
          <h2 className="text-3xl font-bold text-dark mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Our team is here to help you choose the right plan
          </p>
          <a href="/contact" className="btn btn-primary inline-block">
            Contact Sales
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
