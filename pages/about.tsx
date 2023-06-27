import React from 'react';
import Header from '../components/Header';

function About() {
    return (
        <div>
            <Header />

            <button>Le projet</button>
            <button>Notes sur la prononciation</button>
            <button>Autres</button>
            <section>Ce projet a pour but de créer un dictionnaire bi-directionel berrichon-français et français-berrichon</section>
            <section>Mais c'est quoi le berrichon</section>
            <section>
                lien github
            </section>

            <section>
                Autres ressources sur le berrichon
            </section>
        </div>
    );
}

export default About;