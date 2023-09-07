import styles from '@/styles/components/motion/circle-animation.module.css'
import { Keyframes } from '@/components/motion/keyframes'
import { Tooltip } from '@/components/tailwind/client-components'

export default function CircleAnimation() {
	return  <div className={styles.animationWrapper}>
		{ Array.from({length: 10}).map((_, i) => {
			const size = getRandomInt(20, 200);
			return <>
				<Keyframes
					name={`svg-animation-${i}`}
					delay={`${getRandomInt(100, 200) / 100}s`}
					_0={{ marginBottom: '2px' }}
					_70={{ opacity: 0.2 }}
					_100={{ opacity: 0.3, marginBottom: `${getRandomInt(50, 500)}px`}}
				/>
				<Tooltip
					content="🥰"
					animate={{
						mount: { scale: 1, y: 0 },
						unmount: { scale: 0, y: 25 },
					}}
				>
					<Circle key={i} className={`svg-animation-${i}`} width={size} height={size} fill={getRandomColor()} />
				</Tooltip>
			</>;
		})}
	</div>
}

const Circle = ({ width, height, fill, className }: { width: number, height: number, fill: string, className: string }) => {
	return <svg width={width} height={height} className={className}>
		<circle cx={width / 2} cy={width / 2} r={width / 2} fill={fill} />
	</svg>
}

const getRandomInt = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomColor = () => {
	const hexArray = ['#ccc4e1', '#d3d4e4', '#bed7db', '#a0c7d8',
		'#e4e8e7', '#e8ddea', '#efd6d2',
		'#f3dfe2', '#f3f1ce'];
	return hexArray[Math.floor(Math.random() * hexArray.length)];
}
