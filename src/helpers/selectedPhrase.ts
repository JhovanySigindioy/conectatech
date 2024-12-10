const phrases = [
    "¡Qué bueno verte! ¿En qué podemos ayudarte hoy?",
    "¡Hola! ¿Cómo podemos asistirte hoy?",
    "Nos encanta tenerte aquí, ¿qué necesitas hoy?",
    "¡Bienvenido! ¿En qué te podemos ayudar?",
    "Es un placer verte, ¿cómo podemos ayudarte?",
    "¡Qué alegría verte! ¿En qué te podemos ayudar?",
    "¡Saludos! ¿Podemos ayduarte en algo?",
    "Nos complace tenerte aquí, ¿en qué podemos ser útiles?",
    "¡Hola! ¿Cómo podemos facilitarte las cosas hoy?",
    "¡Qué gusto verte! ¿En qué podemos ofrecerte ayuda?",
    "¡Bienvenido! ¿Hay algo en lo que te podamos asistir?",
    "Nos alegra verte, ¿qué podemos hacer por ti?",
    "¡Hola! ¿Cómo podemos ayudarte a resolverlo?",
    "Qué bueno tenerte con nosotros, ¿cómo podemos ayudarte?",
    "¡Qué felicidad verte! ¿En qué podemos apoyarte?",
    "¡Nos da gusto verte! ¿Qué necesitas saber hoy?",
    "Nos alegra verte, ¿cómo te podemos ayudar?",
    "¡Qué bien verte! ¿En qué podemos ofrecerte asistencia?",
    "¡Bienvenido! ¿Qué podemos hacer para que todo sea más fácil?",
    "¡Nos complace verte! ¿Cómo podemos ayudarte hoy?"
];

export const selectedPhrase = (): string => {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
}