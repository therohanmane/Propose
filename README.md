# 💍 Propose - A Romantic Interactive Experience

A playful, romantic, and interactive web experience designed to surprise your special someone. This project creates a suspenseful "secret message" scenario that ultimately leads to a heartwarming proposal, featuring a mischievous "No" button that refuses to be clicked!

## ✨ Features

*   **Suspenseful Intro**: Starts as a "Encrypted Message" that requires "Identity Verification" to unlock.
*   **Personalized Responses**: Recognizes specific names (e.g., Ruby, Priya, Ananya) and delivers custom flirtatious messages.
*   **Playful "Security Check"**: A cute verification step asking "Are you the cutest person in the world?".
*   **The Impossible "No"**: The "No" button playfully runs away from the cursor when hovered or clicked, while the "Yes" button grows bigger and bigger!
*   **Atmosphere**: Includes background music, floating heart particles, and typing text effects for a premium romantic feel.
*   **Responsive**: Works beautifully on both desktop and mobile devices.

## 🚀 How to Use

1.  **Clone or Download**: Download this repository to your local machine.
2.  **Add Music**: ensure you have a `music.mp3` file in the folder for the background audio (or it will fallback to a default online track).
3.  **Open**: Double-click `index.html` to open it in your web browser.
4.  **Enjoy**: Turn up the volume and let your partner go through the steps!

## 🛠️ Customization

You can easily personalize the messages for your specific partner.

### 1. Custom Messages
Open `script.js` and look for the `flirtMessages` object:

```javascript
const flirtMessages = {
    "your_partner_name": [
        "Your custom message line 1...",
        "Your custom message line 2..."
    ],
    "default": [
        "Messages for anyone else..."
    ]
};
```
*   Add a new key with your partner's name (lowercase) to give them a unique experience.

### 2. Background Music
*   Replace the `music.mp3` file in the root directory with your partner's favorite song.

## 💻 Technologies Used

*   **HTML5**: Structure and semantic layout.
*   **CSS3**: Advanced animations, flexbox layout, and responsive design.
*   **JavaScript**: Logic for the step-by-step flow, typing effects, and the "chasing button" mechanics.

## 📄 License

This project is open for anyone to use for their own special moments! ❤️