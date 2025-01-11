# Clock App ⏰

A responsive, feature-rich clock application built with **React**, **Redux**, **Emotion**, and **Framer Motion**. This app allows users to view and edit clocks for multiple timezones with smooth animations and an intuitive interface.

---

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Code Highlights](#code-highlights)
  - [Responsive Design](#responsive-design)
  - [Carousel Implementation](#carousel-implementation)
  - [Clock Visualization](#clock-visualization)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Edit Clocks**: Manage clocks for various timezones.
- **Smooth Animations**: Seamless transitions between pages and UI components using Framer Motion.
- **Responsive Design**: Adaptable layout for mobile, tablet, and desktop using custom breakpoints.
- **Day/Night Mode**: Clock background changes based on sunrise and sunset for a realistic feel.
- **Timezone Selector**: A searchable and customizable dropdown to choose a timezone.

---

## Technologies Used

- **React**: Component-based UI library.
- **Redux**: State management for timezones and user authentication.
- **Emotion**: Styled-components for CSS-in-JS.
- **Framer Motion**: Animations and transitions.
- **Luxon**: Timezone handling and date-time utilities.
- **SunCalc**: Day/Night detection based on geographic coordinates.
- **React-Router**: Navigation and route protection.

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/clock-app.git
   cd clock-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open the app in your browser:
   ```bash
   http://localhost:5173
   ```

## Usage

### Main Page Overview

- The main page displays two clocks:
  - One clock shows the current timezone based on your location.
  - The second clock is pre-set to a default timezone.
  - The timezone of both clocks can be edited

### Editing a Clock

1. Click the right top icon to open the edit page.
2. Modify clock details.
3. Save changes to update the clock.

### Navigating the Carousel

- Click on left and right clock to scroll through available clocks.
- Each page shows up to 4 clocks options with smooth transitions.(desktop)

## Code Highlights

### Responsive Design

- Breakpoints: Defined in a single source of truth and used across components for consistency.

  ```javascript
  export const breakpoints = {
    mobile: '576px',
    tablet: '768px',
    desktop: '1024px',
    largeDesktop: '1440px',
  };
  ```

- Applied via Emotion and custom hooks:

  ```javascript
  const useResponsive = () => {
    const { width } = useWindowSize();
    return {
      isMobile: width <= parseInt(breakpoints.mobile),
      isTablet:
        width > parseInt(breakpoints.mobile) &&
        width <= parseInt(breakpoints.desktop),
      isDesktop: width > parseInt(breakpoints.desktop),
    };
  };
  ```

### Carousel Implementation

- Optimized for performance:

  - Only 4 clocks are rendered per page using Array.slice.
  - Smooth transitions with transform and Framer Motion.

  ```javascript
  <CarouselGrid offset={currentPage}>
    {TIMEZONE_OPTIONS.slice(
      currentPage * itemsPerPage,
      currentPage * itemsPerPage + itemsPerPage
    ).map((option) => (
      <ClockCard key={option.label} clock={option} />
    ))}
  </CarouselGrid>
  ```

### Clock Visualization

- Canvas used for rendering the clock face.
- Day/Night Mode changes clock background dynamically based on geographic coordinates.

  ```javascript
  const updateDaytimeStatus = () => {
    const now = DateTime.now().setZone(timezone).toJSDate();
    const sunTimes = SunCalc.getTimes(now, latitude, longitude);

    const isDaytime = now >= sunTimes.sunrise && now <= sunTimes.sunset;
    setIsDaytime(isDaytime);
  };
  ```

- Responsive size adjustment:
  ```javascript
  const size = isMobile ? 180 : isTablet ? 240 : 300;
  <ClockVisual size={size} {...props} />;
  ```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes and submit a pull request.

## License

This project is licensed under the MIT License.
# clockapp
