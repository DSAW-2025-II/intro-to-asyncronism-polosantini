[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/fOa_bXW6)
# Desarrollo de Aplicaciones Web - Martín Polo Santini - 335656

# PROFE, ANTES DE CONTINUAR LEYENDO:

=> El código de este proyecto fue inspirado por [Pizza Legends - JavaScript RPG](https://www.youtube.com/playlist?list=PLcjhmZ8oLT0r9dSiIK6RB_PuBWlG1KSq_) de Drew Conley. Mis agradecimientos a su proyecto educativo en programación. Hay fragmentos de código idénticos al suyo ya que no sabía que hacer para animar con el sprite o cosas así. Cabe recalcar de que a pesar de que no copié su código sin ver de que era, y de que estuve "programando" al ritmo al que él lo hacía, hay fragmentos que no logré entender debido a que eran muy abstractos o manejaban temas de los que no tenía conocimiento, creo que se nota desde qué parte del código empecé a divergir en torno a esta Pokédex.

=> El layout principal está basado en una Nintendo DSi, la tuve de pequeño :D

=> Los diseños tanto de mapas como de personajes son de mi propiedad. Los recursos como las imágenes de los Pokemones son consumidos por la API. Fueron hechos en Photoshop por comodidad, mientras aprendo a usar Figma.

=> Los códigos de interés para el profesor se pueden encontrar en:

- **OverworldEvent** (funciones dictionary, diccionario, obtenerPokemon y cargarPokemonesTipo) => En estos se hace el fetch de la API y la manipulación DOM para mostrar el diccionario
- **OverworldMap** (Creación de mapas y sus eventos. Además de la función createMap >:D)
- **Overworld** (Por el manejo de eventos en init, y su enlace con los botones)
- **DirectionInput y TextMessage** (Por el link entre los botones y los eventos)
- **Config.js** (Acá se definen las variables de entorno)
- **La carpeta de Styles**, ya verá la explicación en lo que descubrí en la siguiente sección.
- **HTML**, por supuesto.

Estos fragmentos tienen comentarios míos, para que facilite su evaluación.

=> **¿Qué descubrí?**
- No sabía que se podían hacer varios documentos CSS. Al final, por la escala del proyecto, hice varios para ser más organizado con lo que yo hacía. Puede que al momento de revisar solo veas uno, pero también puede que sean 4 o más. Ya lo solucioné, lo que hice fue pedirle a Chat que me compactara los 4 y los acomodé jijiji.
- JavaScript es muy raro la verdad.
- No me gustaría volver a hacer un videojuego, me extendí mucho en su elaboración.
- Cada vez más detesto CSS jaja.

=> **¿Qué le falta por pulir?**
- Probablemente algunas cosas de estilo.
- El diseño, podría con más paciencia hacer un diseño más chévere y meterle a los VFX y SFX.


## Introducción al Asíncronismo

[Vercel](https://intro-to-asyncronism-polosantini.vercel.app/)

## Funcionalidades

- Crear una aplicación web que se comunique con la API propuesta: https://pokeapi.co/
- Esta aplicación debe permitir consultar información de diferentes maneras, es obligatorio que de cada consulta se muestre como mínimo en la aplicación desplegada: el nombre del pokemón, su peso, su nombre y la foto del personaje.
- Debe llamar al menos 3 endpoints diferentes, usted decide cuáles y de qué forma.


## Requisitos

- Marcar el repositorio, recuerde que tarea que se entregue sin nombre será calificada con cero.
- Desplegar la página, recuerde que tarea que se entregue sin desplegar será calificada con cero.


# Documentos sugeridos
- [¿Qué es figma?](https://www.youtube.com/watch?v=1pW_sk-2y40&pp=ygUMZmlnbWEgY291cnNl)
- [Figma en 24 minutos](https://www.youtube.com/watch?v=FTFaQWZBqQ8&t=22s&pp=ygUMZmlnbWEgY291cnNl)
- [¿Cómo manejar el asíncronismo correctamente?](https://www.youtube.com/watch?v=vn3tm0quoqE&pp=ygUWYXN5bmMgYXdhaXQgamF2YXNjcmlwdA%3D%3D)


## Rúbrica

| Criterio           | Puntaje |
|--------------------|---------|
| Creatividad        | 1       |
| Diseño             | 1       |
| Calidad del código | 1.5     |
| Funcionalidad      | 1.5     |

