import React from "react";
import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";

const Contact: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="bg-white dark:bg-gray-900 min-h-svh">
        <section className="px-16 mb-12">
          <h1 className="p-2 text-3xl font-bold leading-none tracking-tight text-gray-900 dark:text-white">
            Contact
          </h1>
          <p className="p-2 dark:text-white">
            Si vous avez des questions ou si vous voulez suggérer des
            corrections, ou des mots manquants au dictionnaire, vous pouvez le
            faire avec le formulaire ci-dessous ou en envoyant un courriel à
            l&#39;adresse suivante:
            <span className="p-2 dark:text-white underline">
              dictionnaire-berrichon@outlook.com
            </span>
          </p>
        </section>
        {/*<ContactForm />*/}
      </main>
    </>
  );
};

export default Contact;
