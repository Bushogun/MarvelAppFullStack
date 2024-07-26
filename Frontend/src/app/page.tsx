'use client'
import Image from "next/image";
import styles from "@/app/page.module.scss";

const Home = () => {
  return (
    <section className={styles['home-section']}>
      <div className={styles['hero-container']}>
        <div className={styles['about-container']}>
          <Image
            src="/untitled.png"
            alt="Jonathan Soto"
            title="Jonathan Soto"
            width="650"
            height="300"
          />
          <Image
            src="/3dmodelJs2.png"
            alt="3D Model JS"
            title="Jonathan Soto"
            width="450"
            height="650"
          />
        </div>
        <h1 className={styles.title}>¡Bienvenidos!</h1>
        <h2 className={styles.subtitle}>
          Gracias por tomarse el tiempo de hacer una revisión de este código!
          <br />
          <br />
          En esta aplicación (en la sección Dashboard) encontrará la data de Marvel consumida,
          espera un poco y se desplegará la data, podrás marcar como favorito y acceder a un cómic con sus
          especificaciones para ver sus detalles.
          ¡Explora y disfruta!
        </h2>
      </div>
    </section>
  );
}

export default Home;