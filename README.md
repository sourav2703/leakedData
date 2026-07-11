# Cyber Vault

A production-style Angular 18.2.6 standalone application with a cinematic hacker boot sequence, animated vault door transition, and neon terminal dashboard.

## Tech

- Angular 18.2.6 standalone components
- TypeScript, RxJS, Angular Animations
- GSAP for advanced door and card motion
- Plain CSS files, no SCSS

## Run

```bash
npm install
ng serve
```

Open `http://localhost:4200`.

## Project Structure

```text
src/
  app/
    components/
      boot-screen/
      vault-door/
      matrix/
      dashboard/
      user-card/
      terminal/
      header/
      sidebar/
    shared/
    services/
    models/
  assets/
    images/
    sounds/
```

Sound support is wired through `AudioService` and kept optional. Add files named `typing.mp3`, `unlock.mp3`, `door-open.mp3`, `beep.mp3`, `hover.mp3`, and `ambient.mp3` in `src/assets/sounds/` to enable audio cues.
