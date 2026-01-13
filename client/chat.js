const OPENAI_KEY = "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";

const chatHTML = `
    <div id="chat-container" style="position: fixed; bottom: 24px; right: 24px; z-index: 1000; color: white; font-family: sans-serif;">
        <button id="chat-toggle" style="background: #22c55e; border: none; border-radius: 50%; width: 60px; height: 60px; cursor: pointer; box-shadow: 0 10px 25px rgba(0,0,0,0.3); font-size: 24px;">💬</button>
        <div id="chat-window" style="display: none; background: #1a1a1a; width: 320px; height: 450px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); flex-direction: column; overflow: hidden; margin-bottom: 15px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
            <div style="background: #22c55e; padding: 15px; color: white; font-weight: bold; display: flex; justify-content: space-between;">
                <span>Lojzovy Paseky AI</span>
                <button id="chat-close" style="background: none; border: none; color: white; cursor: pointer;">✕</button>
            </div>
            <div id="chat-messages" style="flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 10px; background: rgba(0,0,0,0.2);">
                <div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 15px; font-size: 13px;">Dobrý den! 👋 Jsem asistent pro Lojzovy Paseky. Jak vám mohu pomoci?</div>
            </div>
            <div style="padding: 15px; border-top: 1px solid rgba(255,255,255,0.1); display: flex; gap: 8px;">
                <input id="chat-input" type="text" placeholder="Napište nám..." style="flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 8px; color: white; font-size: 13px; outline: none;">
                <button id="chat-send" style="background: #22c55e; border: none; border-radius: 8px; padding: 8px 15px; color: white; font-weight: bold; cursor: pointer;">OK</button>
            </div>
        </div>
    </div>
`;

document.getElementById('ai-chat-root').innerHTML = chatHTML;
const toggle = document.getElementById('chat-toggle');
const windowEl = document.getElementById('chat-window');
const close = document.getElementById('chat-close');
const input = document.getElementById('chat-input');
const send = document.getElementById('chat-send');
const messages = document.getElementById('chat-messages');

toggle.onclick = () => { windowEl.style.display = 'flex'; toggle.style.display = 'none'; };
close.onclick = () => { windowEl.style.display = 'none'; toggle.style.display = 'block'; };

async function askAI(text) {
    const userMsg = document.createElement('div');
    userMsg.style.cssText = "background: #22c55e; padding: 10px; border-radius: 15px; font-size: 13px; align-self: flex-end; color: white;";
    userMsg.innerText = text;
    messages.appendChild(userMsg);
    messages.scrollTop = messages.scrollHeight;

    try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${OPENAI_KEY}` },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [{ role: 'system', content: 'Jsi asistent pro luxusní apartmány Lojzovy Paseky na Šumavě. Odpovídej profesionálně v češtině.' }, { role: 'user', content: text }]
            } )
        });
        const data = await res.json();
        const aiMsg = document.createElement('div');
        aiMsg.style.cssText = "background: rgba(255,255,255,0.1); padding: 10px; border-radius: 15px; font-size: 13px; align-self: flex-start; color: white;";
        aiMsg.innerText = data.choices[0].message.content;
        messages.appendChild(aiMsg);
        messages.scrollTop = messages.scrollHeight;
    } catch (e) { console.error(e); }
}

send.onclick = () => { if(input.value) { askAI(input.value); input.value = ''; } };
input.onkeypress = (e) => { if(e.key === 'Enter' && input.value) { askAI(input.value); input.value = ''; } };
