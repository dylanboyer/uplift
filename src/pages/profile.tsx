import { Link } from "react-router-dom";

import Widget from '@/components/widget';
import EntryManager from '@/components/entry_manager';

import '@/components/widget.css'

export default function Profile() {
	
  return (
	<div>users profile
	  <div className="widgetBox">
		<Widget exerciseId="1" />
		<Widget exerciseId="2" />
		<Widget exerciseId="3" />
		<Widget exerciseId="4" />
		<Widget exerciseId="5" />
	  </div>
	</div>
  )
}
