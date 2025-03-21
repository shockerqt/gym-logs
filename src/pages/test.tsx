import { useRef, useState } from "react";

const TIME = 1000;

const GymLog = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const x = useRef(0); // Almacena la posición inicial del toque
  const translateX = useRef(0); // Almacena el valor actual de translateX
  const velocity = useRef(0); // Almacena la velocidad del gesto
  const [days, setDays] = useState([...Array(5)].map((_, i) => i));

  // Función para calcular la posición más cercana para el snapping
  const getNearestSnapPosition = (
    currentTranslateX: number,
    velocity: number,
  ) => {
    if (!contentRef.current) return 0;

    const itemWidth = contentRef.current.children[0].clientWidth; // Ancho de cada elemento
    const totalItems = contentRef.current.children.length;

    // Calculamos el ítem actual basado en la posición
    const currentItem = Math.round(currentTranslateX / itemWidth);

    // Determinamos si avanzar o retroceder un ítem basado en la velocidad
    let targetItem = currentItem;
    console.log(velocity);
    if (velocity > 10) {
      targetItem = currentItem - 1;
    } else if (velocity < -10) {
      targetItem = currentItem + 1;
    }

    // Aseguramos que no nos salgamos de los límites
    if (targetItem > 0) targetItem = 0;
    if (targetItem < -(totalItems - 1)) targetItem = -(totalItems - 1);

    // Calculamos la posición de snapping
    const targetPosition = targetItem * itemWidth;
    console.log("POSITION", targetPosition);
    return targetPosition;
  };

  const handleTouchStart: React.TouchEventHandler<HTMLDivElement> = (event) => {
    if (contentRef.current) {
      // contentRef.current.style.transition = "none";
      const match = contentRef.current.style.transform.match(
        /translateX\((-?\d+)px\)/,
      );

      if (match) {
        const valueInPixels = parseInt(match[1], 10);
        console.log("CURRENT", valueInPixels);
        translateX.current = valueInPixels;
      }
    }
    const touch = event.touches[0];
    x.current = touch.clientX; // Guardamos la posición inicial del toque
    velocity.current = 0; // Reiniciamos la velocidad
  };

  const handleTouchMove: React.TouchEventHandler<HTMLDivElement> = (event) => {
    const touch = event.touches[0];
    const delta = x.current - touch.clientX; // Calculamos el delta
    x.current = touch.clientX;

    if (contentRef.current) {
      contentRef.current.style.transition = "none";
      // Actualizamos el valor de translateX
      translateX.current -= delta;
      contentRef.current.style.transform = `translateX(${translateX.current}px)`;

      // Calculamos la velocidad del gesto
      velocity.current = delta;
    }
  };

  const handleTouchEnd = () => {
    if (!contentRef.current) return;

    // Calculamos la posición de snapping basada en la velocidad
    const targetPosition = getNearestSnapPosition(
      translateX.current,
      velocity.current,
    );

    // Aplicamos la animación de snapping
    contentRef.current.style.transition = `transform ${TIME}ms ease-out`;
    contentRef.current.style.transform = `translateX(${targetPosition}px)`;
    translateX.current = targetPosition; // Actualizamos el valor de translateX

    // Eliminamos la transición después de que termine la animación
    // setTimeout(() => {
    //   if (contentRef.current) {
    //     contentRef.current.style.transition = "none";
    //   }
    // }, TIME); // Duración de la animación (0.3s)
  };

  return (
    <>
      <div
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd} // Añadimos el evento onTouchEnd
        className="flex overflow-x-hidden w-full h-full items-center"
      >
        <div
          ref={contentRef}
          className="flex transition-transform duration-300 ease-out" // Transición para el snapping
        >
          {days.map((day) => (
            <div
              key={day}
              className="flex-shrink-0 w-full h-[30dvh] flex items-center justify-center snap-center border-1 select-none"
            >
              <h1 className="text-2xl font-bold">Registro de {day}</h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default GymLog;
