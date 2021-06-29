import React from 'react';
import {
	Label,
	LabelList,
	PieChart,
	Pie,
	Cell,
} from "recharts";
import { Flex, Box } from '@chakra-ui/react';

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
	if(percent === 0) return null;
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PaisaPie = ({ data, showPieCrumbs = true, ...rest }) => {
	const fills = ['#0088FE', '#dd7876', '#FFBB28', 'brown', 'pink', 'black'];

	if(!showPieCrumbs) {
		return (
			<Flex
				justifyContent="center"
				alignItems="center"
				width="400px"
				height="100px"
			>
				No Data to show
			</Flex>
		)
	}
	return (
		<>
			<Flex
				h="400px"
				justifyContent="center"
				alignItems="center"
				flexDirection="column"
				{...rest}
			>
				<PieChart width={400} height={400}>
					<Pie
						data={data}
						cx="50%"
						cy="50%"
						labelLine={false}
						label={renderCustomizedLabel}
						outerRadius={125}
						fill="#8884d8"
						dataKey="value"
					>
						{data.map((entry, index) => (
							<Cell key={`cell-${index}`} fill={fills[index]} />
						))}
					</Pie>
				</PieChart>
				<div
					style={{
						display: 'flex',
						maxWidth: "100%",
						flexWrap: "wrap",
						justifyContent: "center",
						marginLeft: "75px"
					}}
				>
					{data.map((entry, index) => {
						return (
							<Flex
								marginRight='40px'
								paddingBottom='80px'
								marginTop='-40px'
								alignItems='center'
								justifyContent={{ md: "center", sm: "flex-start"}}
							>
								<div
									style={{
										height: '25px',
										width: '25px',
										backgroundColor: fills[index],
										marginRight: '8px'
									}}
								>
								</div>
								<div>{entry.name}</div>
							</Flex>
						)
					})}
				</div>
			</Flex>
		</>
	)
};

export default PaisaPie;