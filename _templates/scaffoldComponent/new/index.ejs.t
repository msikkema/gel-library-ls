---
to: packages/<%= paramCase %>/index.tsx
force: true
---

import React, { FC } from "react";

const <%= pascalCase %>: FC = () => <button>Your component, here!</button>;

export default <%= pascalCase %>;
