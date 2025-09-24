# Shared Table Component

This Repository Contains A **React Table Component** And **Pure Js Web Component** Ready To Use On Any HTML/IIS Page or In React Project.

---

## 1. Avilable Files After Bundling

-   `dist/shared-table.umd.js` -> UMD Version for direct use in HTML/IIS
-   `dist/shared-table.es.js` -> ESM Version for use in React Project
-   `src/SharedTable.jsx` -> Original React Component for direct use in React Component

---

## 2. File In React App Before Build Component

1. Create App , For Example:
   |_ src
   |** index.jsx -> Entry Point
   |** shared-table.jsx -> Web Component
   |\_\_ Table.jsx -> React Reusable Component
   |_ vite.config.js

---

## 3. Setup Build Shared Component

-   1. index.jsx

```python
export {default as Table} from "./Table.jsx"; // React Component
import "./shared-table.jsx" // Web Component
```

-   2. table.jsx

```python
const Table = () => {
  return (
      <div>Add Your Table Code 😄</div>
  )
}

export default Table
```

-   3. shared-table.jsx

```python
class SharedTable extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
        <table border="1" style="border-collapse:collapse;width:100%">
        <thead><tr></tr></thead>
        <tbody></tbody>
        </table>

        `
    }
    set data(value){
        this._data=value;
        this._render();
    }
    _render(){
        const table = this.querySelector("table");
        const thead = this.querySelector("thead");
        const tbody = this.querySelector("tbody");
        thead.innerHTML ="";
        if(this._data?.length){
            Object.keys(this._data[0]).forEach((key)=>{
                const th = document.createElement("th");
                th.textContnent = key;
                thead.appendChild(th)
            })
        }
        tbody.innerHTML ="";
        if(this._data.forEach((row)=>{
            const td = document.createElement("tr")
            Object.values(row).forEach((val)=>{
                const td = document.createElement("td");
                td.textContent =val;
                tr.appendChild(td)
            }) ;
            tbody.appendChild(tr)
        }))
    }
}
customeElements.define("shared-table", SharedTable)
```

-   4. vite.config.js

```python
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: "./src/index.jsx",
            name: "SharedTable",
            fileName: (format) => `shared-table.${format}.js`,
            formats: ["umd", "es"],
        },
        roullupOptions: {
            external: ["react", "react-dom"],
        },
        define: {
            "process.env.NODE_ENV": JSON.stringify("production"),
        },
    },
});

```

---

## 4. File On Server

1. Add File On The Server , For Example:
   C:\inetpub\wwwwroot\table
   |_ index.html -> HTML App
   |_ main-app -> react app
   |\_ dist
   |** shared-table.es.js
   |** shared-table.umd.js

---

## 5. How To Use ?

-   1. In IIS Or HTML [View Source Code](./index.html)
-   2. In React App [View Source Code](./react-app/src/App.jsx)

---
