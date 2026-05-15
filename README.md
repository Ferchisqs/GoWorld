# GoWorld — Travel Agency Landing Page

> Collect moments from around the world.

Una landing page para agencia de viajes construida con **React + TypeScript + Vite + Tailwind CSS**, con soporte de internacionalización (ES/EN), modo oscuro y datos reales desde APIs externas.

---

## Instalación y ejecución

### Prerequisitos

- Node.js `>= 18`
- npm `>= 9`

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/goworld.git
cd goworld

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env en la raíz del proyecto
# Agrega la variable:
# VITE_UNSPLASH_ACCESS_KEY=tu_access_key

# 4. Servidor de desarrollo
npm run dev

```

La app estará disponible en `http://localhost:5173`.

### Otros scripts

```bash
npm run build      # Build de producción (TypeScript + Vite)
npm run preview    # Preview local del build de producción
npm run lint       # Análisis estático con ESLint
```

---

## Justificación de decisiones de diseño

### Paleta de color

|-------|-------|-----|
| Verde principal | `#8ED77C` | CTAs, acentos, highlights |
| Verde oscuro | `#061202` | Fondos en modo oscuro |
| Negro | `#0A0A0A` | Textos, contraste |

La combinación **verde lima + negro profundo** evoca naturaleza, aventura y modernidad — atributos clave de una agencia de viajes contemporánea. El contraste es alto y la energía del verde mantiene al usuario activo visualmente.

### Concepto visual: el collage de viaje

Cada sección fue diseñada para evocar la sensación de un **diario de viaje físico**:

- **Hero**: composición tipo collage, imágenes superpuestas a modo de fotografías apiladas, transmitiendo la emoción de acumular momentos.
- **About**: diseñado como un **pasaporte**, con sellos, tipografía consular y distribución de dos hojas (izquierda/derecha), generando inmersión en la temática viajera.
- **Destinations**: cards con efecto fotográfico, datos reales del país (bandera, población, idioma, moneda, zona horaria) para que se sienta como una guía de viaje real.

### Principios UX/UI aplicados

- **Proporcionalidad**: jerarquía tipográfica clara, espaciados proporcionales con escala modular.
- **Contraste y legibilidad**: todos los textos superan WCAG AA sobre los fondos usados.
- **Progresión narrativa**: el scroll cuenta una historia — te inspira (Hero), te convence (Packages), te informa (Destinations), te resuelve dudas (FAQ), te da confianza (Reviews) y te convierte (Quote / Contact).
- **Modo oscuro / claro**: implementado desde el primer día vía `ThemeContext`, sin parpadeos.
- **Estados de flujo**: los formularios tienen retroalimentación visual explícita (error, éxito) para reducir ansiedad del usuario.

---

## Justificación de decisiones técnicas

### React + TypeScript
Tipado estático desde el inicio reduce errores en runtime y mejora la experiencia de desarrollo. Los tipos para `Destination`, `Contact` y `Package` están centralizados en `src/types/`.

### Vite
Bundler ultrarrápido con HMR (Hot Module Replacement) prácticamente instantáneo. La experiencia de desarrollo con Tailwind CSS v4 + Vite es notablemente fluida.

### Arquitectura de componentes
Se separaron tres niveles de responsabilidad:

```
components/
  layout/     → estructura persistente (Navbar, Footer)
  sections/   → bloques de página (Hero, About, etc.)
  ui/         → átomos reutilizables (Cards, Modals, Forms)
```

Esta división facilita mantenimiento, pruebas y reutilización.

### Hooks personalizados
- `useInView` → detecta cuando una sección entra al viewport para disparar animaciones de entrada, evitando cargar animaciones de elementos fuera de pantalla.
- `useContactForm` → encapsula validación, estado y submit del formulario de contacto.
- `useDestinations` → maneja el fetch a la API externa, loading states y manejo de errores.

### Context API para el tema
`ThemeContext` gestiona el modo claro/oscuro de forma global sin necesidad de una librería de estado externa — suficiente para este scope.

### API real de destinos
La sección **Destinations** consume una API externa que retorna datos geográficos reales del país (zona horaria, idiomas, población, moneda). Ejemplo de datos para Canadá:

```
Timezone    UTC-08:00
Languages   English, French
Population  41.7M
Currencies  Canadian dollar ($)
```

Esto le da credibilidad y contenido dinámico a la landing sin gestionar una base de datos propia.

---

## Librerías utilizadas

| `react` + `react-dom` | ^19 | Framework UI principal |
| `typescript` | ~6.0 | Tipado estático, mejor DX |
| `vite` | ^8 | Bundler rápido, HMR, build optimizado |
| `tailwindcss` | ^4 | Estilos utilitarios sin CSS custom verboso |
| `i18next` | ^26 | Motor de internacionalización |
| `react-i18next` | ^17 | Integración de i18next con hooks de React |
| `i18next-browser-languagedetector` | ^8 | Detección automática del idioma del navegador |
| `lucide-react` | ^1.16 | Iconos SVG consistentes y tree-shakeable |

---

## ¿Qué mejoraría con más tiempo?

- **Animaciones más elaboradas**: transiciones entre secciones con timeline, parallax en el Hero, efecto de "stamp" animado en el pasaporte.
- **Responsivo más pulido**: revisar breakpoints edge cases (tablets landscape, pantallas muy anchas), ajustar grids y tipografía fluida con `clamp()`.
- **Separación de responsabilidades**: algunos componentes de sección (como `Destinations`) mezclan lógica de fetch con renderizado; extraerlos a hooks y contenedores dedicados.
- **Testing**: añadir tests unitarios con Vitest para hooks y utils, y tests de integración con Testing Library para formularios.
- **Accesibilidad (a11y)**: auditoría completa con axe-core, mejorar roles ARIA en el FAQ (accordion), el modal de paquetes y el carrusel de opiniones.
- **Optimización de imágenes**: usar formatos WebP/AVIF con lazy loading nativo y `srcset` para diferentes densidades de pantalla.
- **Despliegue CI/CD**: pipeline en GitHub Actions que haga lint + build en cada PR antes de deploy a Vercel/Netlify.
- **Semántica HTML**: revisar el uso de `<div>` vs elementos semánticos (`<article>`, `<aside>`, `<figure>`) para mejorar SEO y accesibilidad.
- **Más interactividad**: mapa interactivo de destinos, filtro por región/continente, favoritos guardados en localStorage.

---

## Propuesta para una siguiente fase

1. **Backend + base de datos**
   - API REST o GraphQL propia (Node.js / Next.js API routes) con base de datos de destinos, paquetes y reservas.
   - Autenticación de usuarios (OAuth + JWT) para guardar viajes favoritos e historial de cotizaciones.

2. **Buscador avanzado de destinos**
   - Filtros por presupuesto, duración, tipo de viaje (aventura, relax, cultura), mes de salida.
   - Integración con APIs de vuelos (Amadeus, Skyscanner) y hoteles (Booking.com API) para mostrar precios reales.

3. **Flujo de reserva completo**
   - Carrito de viaje → selección de fechas con calendario → pago con Stripe.
   - Emails transaccionales de confirmación (Resend / SendGrid).

4. **Panel de administración**
   - CMS interno para que el equipo de GoWorld gestione paquetes, fotos y precios sin tocar código.

5. **PWA + App móvil**
   - Convertir la landing en Progressive Web App con notificaciones push para alertas de precios.
   - Considerar React Native con código compartido para app iOS/Android.

6. **Analítica y personalización**
   - Tracking de comportamiento (PostHog / Mixpanel) para optimizar el funnel de conversión.
   - Recomendaciones personalizadas de destinos basadas en el historial del usuario.

---

## Arquitectura del proyecto

```
goworld/
├── public/
│   ├── images/
│   ├── locales/
│   │   ├── en/translation.json
│   │   └── es/translation.json
│   ├── favicon.svg
│   └── icons.svg
│
└── src/
    ├── components/
    │   ├── layout/       (Navbar, Footer)
    │   ├── sections/     (Hero, About, Destinations, Packages…)
    │   └── ui/           (Cards, Modals, Forms, PassportLeft/Right…)
    ├── context/          (ThemeContext)
    ├── data/             (faqData, packages, quotes, reviews)
    ├── hooks/            (useContactForm, useDestinations, useInView)
    ├── i18n/             (configuración i18next)
    ├── types/            (contact, destination, index)
    ├── App.tsx
    └── main.tsx
```

---

<p align="center">
   - GoWorld 2025
</p>