import { Link } from "react-router-dom";


import Widget from '@/components/widget';
import EntryManager from '@/components/entry_manager';

import '@/components/widget.css'

export default function Home() {
  return (
    <div>This is home!
      <h1><Link to="/login">LOGIN</Link></h1>
      <h1><Link to="/signup">SIGN UP</Link></h1>

      {/*<EntryManager exerciseId="1"/>*/}

      <div className="widgetBox">
        <Widget exerciseId="1" />
        <Widget exerciseId="2" />
      </div>
    </div>
  )
}
