/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Title } from "./Title";

export const Header = () => <header>
    <Title text="MultiLife!"/>
    <p>Welcome, this is a peculiar experiment in <a target="_blank" href="https://en.wikipedia.org/wiki/Cellular_automaton">cellular automata</a>, constructed with curiosity by <a href="https://jmercha.github.io/">jmercha</a>. 🤓</p>
    <p>Everyone who visits multilife.live sees the same grid.</p>
</header>;