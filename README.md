# Vocatio - Plataforma de Orientación Vocacional

## Resumen Técnico

**Vocatio** es una aplicación web de orientación vocacional diseñada para proporcionar experiencias diferenciadas según la edad del usuario (menores y mayores de 18 años).

## 🛠️ Stack Tecnológico

### Frontend
- **HTML5**: Estructura semántica de las páginas
- **CSS3**: Estilos con características modernas
  - Variables CSS
  - Flexbox y Grid Layout
  - Animaciones y transiciones
  - Gradientes y efectos visuales (backdrop-filter, box-shadow)
  - Diseño responsivo con media queries

### Dependencias
- **Sin frameworks JavaScript**: Proyecto vanilla sin dependencias externas
- **Tipografías**: 
  - 'Segoe UI' (sistema)
  - 'Comic Neue' (fuente amigable para menores)

## 📁 Estructura del Proyecto

```
proyectos/
├── README.md
└── HTML/
    ├── index.html                  # Página principal de bienvenida
    ├── crearcuenta1.html           # Registro para mayores de 18
    ├── crearcuenta2.html           # Registro para menores de 18
    ├── dashboard.html              # Panel principal de usuario ✨
    ├── test-vocacional.html        # Test gamificado interactivo ✨
    ├── test-tradicional.html       # Test tradicional científico ✨
    ├── momento-inspiracion.html    # Pantalla motivacional ✨
    └── css/
        ├── Estilos.css             # Estilos globales y página index
        ├── Estilo-mayores.css      # Estilos para adultos
        ├── Estilo-menores.css      # Estilos para jóvenes
        ├── dashboard.css           # Estilos del dashboard ✨
        ├── test-vocacional.css     # Estilos test gamificado ✨
        ├── test-tradicional.css    # Estilos test tradicional ✨
        └── momento-inspiracion.css # Estilos pantalla motivacional ✨
```

## 🎨 Características de Diseño

### Sistema de Colores Universal (Nuevo)

**Paleta Fresca y Atrayente para Todas las Edades:**

- **Turquesa Principal**: `#26B5B5` - Fresco, moderno y profesional
- **Coral Suave**: `#FF9E6D` - Cálido y acogedor
- **Amarillo Soleado**: `#FFD166` - Energético y optimista
- **Morado Suave**: `#9B7EDE` - Creativo y distintivo
- **Verde Menta**: `#6BCF7F` - Natural y positivo
- **Fondo Claro**: `#F8FAFB` - Limpio y espacioso
- **Texto**: `#2D3748` - Legible y profesional

Esta paleta combina tonos frescos y vibrantes que funcionan tanto para jóvenes como adultos, evitando extremos (ni muy seria ni muy infantil).

### Sistema de Colores Diferenciado (Registro)

#### Versión Mayores de 18:
- **Principal**: Azul cielo (#87CEEB, #B6E0FE)
- **Secundario**: Azul oscuro (#1e40af, #3730a3)
- **Fondo**: Blanco (#ffffff)
- **Texto**: Grises (#333, #4b5563)

#### Versión Menores de 18:
- **Principal**: Naranja vibrante (#e07043, #f87a40)
- **Secundario**: Púrpura (#5a67d8)
- **Fondo**: Gradiente pastel (cyan a rosa: #a8edea → #fed6e3)
- **Texto**: Tonos oscuros con alto contraste

### UX/UI

#### Página de Bienvenida (index.html)
- Diseño limpio y minimalista
- Dos opciones claramente diferenciadas
- Navegación intuitiva mediante tarjetas con hover effects
- Responsive design para dispositivos móviles

#### Formularios de Registro

**Mayores de 18 años:**
- Diseño profesional y sobrio
- Cuadro destacado con gradiente azul cielo
- Elementos decorativos flotantes con animación
- Formulario de 4 campos: nombres, email, contraseña, confirmar contraseña
- Enlaces a iniciar sesión y recuperar contraseña

**Menores de 18 años:**
- Diseño colorido y amigable
- Tipografía más informal (Comic Neue)
- Fondo con gradiente pastel
- Elementos decorativos flotantes coloridos
- Lenguaje adaptado ("¡Empezar la aventura!")
- Misma estructura de formulario pero con lenguaje adaptado

## 🎯 Funcionalidades Implementadas

### Sistema de Segmentación por Edad
- Detección inicial de rango etario
- Rutas diferenciadas según la edad del usuario
- Experiencias de usuario personalizadas

### Formularios de Registro
- Validación HTML5 nativa (required)
- Campos: nombres, email, contraseña, confirmar contraseña
- Botones de acción con estilos diferenciados
- Enlaces a funcionalidades adicionales (login, reset password)

### Dashboard Principal ✨
- Navegación intuitiva con iconos
- Tarjeta destacada de "Aventura de Descubrimiento" (test gamificado)
- Grid de opciones: Test Tradicional, Mis Resultados, Historial
- Sistema de badges y etiquetas informativas
- Diseño responsive con cards adaptativas

### Test Vocacional Gamificado ✨
- Sistema de niveles progresivos (Nivel 1-5)
- Preguntas con imágenes atractivas
- Respuestas simples: Sí/No/Omitir
- Feedback instantáneo visual ("¡ME IDENTIFICO!")
- Modal de nivel completado con logros desbloqueables
- Barra de progreso animada
- Experiencia tipo juego para adolescentes

### Test Vocacional Tradicional ✨
- Cuestionario científico de 15 preguntas
- 5 bloques temáticos (preferencias, intereses, habilidades, etc.)
- Opciones de respuesta: Sí/No/Tal vez
- Diseño limpio y profesional
- Radio buttons personalizados
- Banner informativo con contexto

### Momento de Inspiración ✨
- Pantalla motivacional entre niveles
- Datos curiosos sobre carreras
- Diseño llamativo con gradiente amarillo-naranja
- Animaciones de estrellas flotantes
- Botón de continuación destacado
- Efecto de pulsación en iconos

### Animaciones CSS
- **fadeIn**: Aparición gradual de elementos (1s)
- **slideUp**: Deslizamiento desde abajo (0.8s)
- **float**: Movimiento flotante de elementos decorativos (6s loop)
- **pulsar**: Efecto de latido en iconos (2s loop)
- **rotar**: Rotación continua de fondos (20s)
- **feedbackPop**: Aparición explosiva de feedback (0.6s)
- **modalAppear**: Entrada suave de modales (0.5s)
- **Transiciones**: Efectos hover suaves (0.3s ease)

## 📱 Responsive Design

### Breakpoints
- **Móvil**: < 768px
  - Layouts adaptados a columna única
  - Padding reducido
  - Tipografías ajustadas
  - Elementos decorativos ocultos para mejor rendimiento

### Adaptaciones Móviles
- Flexbox con `flex-direction: column`
- Tamaños de fuente escalados
- Espaciados optimizados
- Ancho completo en formularios

## 🔒 Seguridad

### Implementadas
- Campos de tipo `password` para ocultar entrada
- Validación requerida en todos los campos
- Confirmación de contraseña

### Pendientes de Implementación
- Validación del lado del servidor
- Encriptación de contraseñas
- Prevención de inyección SQL/XSS
- Tokens CSRF
- Autenticación y autorización
- Gestión de sesiones

## 🚀 Características Técnicas Destacadas

### CSS Avanzado
- **Variables CSS (Custom Properties)**: Sistema de colores centralizado y reutilizable
- **Backdrop-filter**: Efecto glassmorphism en tarjetas
- **Gradientes lineales y radiales**: Fondos y botones atractivos con profundidad
- **Box-shadow**: Múltiples capas de sombras para profundidad y elevación
- **Transform**: Efectos hover interactivos (translateY, scale, rotate)
- **Keyframes**: 8 animaciones personalizadas únicas
- **Pseudo-elementos**: Efectos visuales decorativos (::before, ::after)
- **CSS Grid y Flexbox**: Layouts modernos y responsivos
- **Transitions**: Más de 50 transiciones suaves en toda la aplicación
- **Position Absolute/Fixed**: Overlays y elementos flotantes
- **Z-index**: Gestión de capas para modales y overlays
- **Object-fit**: Imágenes optimizadas y responsivas

### Accesibilidad
- Estructura semántica HTML5 (`<header>`, `<main>`, `<form>`)
- Labels asociados a inputs
- Atributo `lang="es"` para lectores de pantalla
- Contraste de colores adecuado
- Tamaños de fuente legibles

### Performance
- Sin dependencias JavaScript (carga rápida)
- CSS optimizado por módulos
- Imágenes decorativas mediante CSS (no assets externos)
- Animaciones con `transform` y `opacity` (GPU accelerated)

## 📋 Mejoras Futuras Sugeridas

### Backend
- [ ] Implementar servidor (Node.js/Express, Python/Flask, etc.)
- [ ] Base de datos para usuarios
- [ ] API RESTful para autenticación
- [ ] Sistema de sesiones

### Frontend
- [x] Dashboard de usuario ✅
- [x] Sistema de tests vocacionales (UI completa) ✅
- [ ] Validación JavaScript en tiempo real
- [ ] Lógica de tests funcional (algoritmo de scoring)
- [ ] Sistema de enrutamiento (SPA)
- [ ] Almacenamiento local de preferencias
- [ ] Página de resultados completa
- [ ] Historial de evaluaciones
- [ ] Sistema de perfil de usuario

### UX/UI
- [ ] Modo oscuro
- [ ] Internacionalización (i18n)
- [ ] Mejoras de accesibilidad WCAG 2.1
- [ ] Onboarding interactivo
- [ ] Feedback visual en formularios

### Seguridad
- [ ] Implementar HTTPS
- [ ] Rate limiting
- [ ] Validación de emails
- [ ] Autenticación de dos factores
- [ ] Políticas de contraseñas robustas

## 📄 Licencia

Proyecto educativo/demostrativo.

## 👨‍💻 Autor

Desarrollado como proyecto de aprendizaje web.

---

**Versión**: 1.0.0  
**Última actualización**: Noviembre 2025