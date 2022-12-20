import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { Tooltip } from "react-tippy";
import 'react-tippy/dist/tippy.css'

// import { RadioGroup } from '@headlessui/react'

export default function Home() {
  const [promptInput, setPromptInput] = useState("");
  const [temp, setTemp] = useState(0.5);
  const [respLimit, setRespLimit] = useState(200);
  const [result, setResult] = useState();
  const [model, setModel] = useState('text-davinci-003');

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/openprompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        prompt: promptInput,
        temp: ~~temp,
        respLimit: ~~respLimit,
      }),
    });
    const data = await response.json();
    setResult(data.result);
    setPromptInput("");
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <img src="/dog.png" className={styles.icon} />
        <h3>OpenAI Chat GPT</h3>
        <form onSubmit={onSubmit}>

          <p>Select your AI model</p>
          <label for="text-davinci-003">
            <input type="radio" id="text-davinci-003" name="model" value="text-davinci-003" onClick={() => setModel('text-davinci-003')} defaultChecked />
            text-davici-003</label><br />
          <label for="code-davinci-002">
            <input type="radio" id="code-davinci-002" name="model" value="code-davinci-002" onClick={() => setModel('code-davinci-002')} />
            code-davinci-002</label><br />
          <textarea
            type="text"
            name="prompt"
            placeholder="Enter a prompt"
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
          />
          <br />
          <Tooltip title="Temperature controls the randomness of the model. Lower values will result in more predictable results, while higher values will result in more surprising results.">
            <label>Temperature: {temp}</label>
          </Tooltip>
          <input type="range" min="0" max="1" step="0.1" defaultValue={temp} onChange={(e) => setTemp(e.target.value)} />
          <br />
          <Tooltip title="Response length limit is the maximum number of tokens the model will generate.">
            <label>Response Length Limit: {respLimit}</label>
          </Tooltip>
          <input type="range" min="80" max="3000" step="10" defaultValue={respLimit} onChange={(e) => setRespLimit(e.target.value)} />
          <input style={{ marginBottom: 20 }} type="submit" value="Generate" disabled={!promptInput.length} />
        </form>
        <div style={{ whiteSpace: 'pre-wrap', margin: '0 auto', maxWidth: 800, minWidth: 500, padding: 10, background: '#eee', filter: `invert(${model === 'text-davinci-003' ? 0 : .9})` }}>
          {result}
        </div>
      </main >
    </div >
  );
}
