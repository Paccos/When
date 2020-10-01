import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

export const CopyableComponent = (props: {
	text: string;
	children: React.ReactNode;
}) => {
	const [copied, setCopied] = useState(false);

	return (
		<CopyToClipboard text={props.text} onCopy={() => setCopied(true)}>
			<div>
				{props.children}
				{copied && <p>Link in die Zwischenablage kopiert!</p>}
			</div>
		</CopyToClipboard>
	);
};
