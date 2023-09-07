import React from 'react'

interface IProps {
	name: string;
	delay?: number;
	[key: string]: React.CSSProperties | string;
}

export const Keyframes = (props: IProps) => {
	const toCss = (cssObject: React.CSSProperties | string) =>
		typeof cssObject === "string"
			? cssObject
			: Object.keys(cssObject).reduce((accumulator, key) => {
				const cssKey = key.replace(/[A-Z]/g, v => `-${v.toLowerCase()}`);
				const cssValue = (cssObject as any)[key].toString().replace("'", "");
				return `${accumulator}${cssKey}:${cssValue};`;
			}, "");

	return <style>
		{`
			.${props.name} {
				animation: ${props.name} ${props.delay + 's' || '1s'} 0s infinite cubic-bezier(.65,.05,.36,1) alternate;
			}
			
			.${props.name}:hover {
				animation-play-state: paused;
			}
		
			@keyframes ${props.name} {
				${Object.keys(props)
				.map(key => {
					return ["from", "to"].includes(key)
						? `${key} { ${toCss(props[key])} }`
						: /^_[0-9]+$/.test(key)
							? `${key.replace("_", "")}% { ${toCss(props[key])} }`
							: "";
				})
				.join(" ")}
			}
		`}
	</style>;
};
