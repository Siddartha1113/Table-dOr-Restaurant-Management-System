const fs = require('fs');
const p = 'src/app/pages/OwnerDashboard.tsx';
let txt = fs.readFileSync(p, 'utf-8');

txt = txt.replace(/\n      <\/main>$/, '\n      </main>\n    </div>\n  );\n}');

fs.writeFileSync(p, txt);
