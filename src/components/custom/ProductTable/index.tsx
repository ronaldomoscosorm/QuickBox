import { useState } from 'react';
import { BSProductsInfo } from '../../../classes/BSAnswer';
import useSortableData from '../../../hooks/useSortableData';
import { dataPagination } from '../../PaginationButtons';
import Spinner from '../../bootstrap/Spinner';
import Icon from '../../icon/Icon';
import TablePagination from './TablePagination';

interface IEventProductTableProps {
	data: BSProductsInfo[];
	setData: React.Dispatch<React.SetStateAction<BSProductsInfo[]>>;
	onEdit: (product: BSProductsInfo) => void;
	isLoading: boolean;
}

export default function ProductTable({ data, setData, onEdit, isLoading }: IEventProductTableProps) {
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(5);

	const { items } = useSortableData(data);
	const onCurrentPageData = dataPagination(items, currentPage, perPage);
	const removeItem = (indexToRemove: number) => {
		// Atualize o estado 'items' removendo o item pelo índice
		setData((prevItems) => prevItems.filter((_, index) => index !== indexToRemove));
	};

	return (
		<>
			{isLoading ? (
				<div className='w-100 text-center my-4'>
					<Spinner className='text-center' />
				</div>
			) : (
				<>
					{data?.length === 0 ? (
						<p className='text-center mt-5' style={{ fontSize: '3em', opacity: 0.3 }}>
							Nenhum resultado encontrado
						</p>
					) : (
						<div className='h-100 d-flex flex-column justify-content-between'>
							<table
								className='w-100'
								style={{ borderCollapse: 'separate', borderSpacing: '10px 0' }}>
								<thead className='table table-modern'>
									<tr>
										<th style={{ fontSize: '1.5em' }}>Produto</th>
										<th style={{ fontSize: '1.5em' }}>Quantidade</th>
										<th style={{ fontSize: '1.5em' }}>Preço</th>
										<th style={{ fontSize: '1.5em' }}>Total</th>
									</tr>
								</thead>
								<tbody>
									{onCurrentPageData.map((item: BSProductsInfo, index) => {
										return (
											<tr key={index}>
												<td
													style={{
														fontSize: '1.3em',
														padding: '.6em 0',
													}}>
													{item?.cmpDcProduto}
												</td>
												<td style={{ fontSize: '1.3em' }}>
													{item?.cmpVlQuantidade}
												</td>
												<td style={{ fontSize: '1.3em' }}>
													R${' '}
													{item?.cmpVlPreco.toFixed(2).replace('.', ',')}
												</td>
												<td style={{ fontSize: '1.3em' }}>
													R${' '}
													{(item?.cmpVlQuantidade * item?.cmpVlPreco)
														.toFixed(2)
														.replace('.', ',')}
												</td>
												<td>
													<Icon
														icon='edit'
														className='fs-3'
														style={{ cursor: 'pointer' }}
														onClick={() => onEdit(item)}
													/>
													<span
														className='mx-3'
														style={{
															borderRight: '2px solid gray',
															height: '25px',
														}}></span>
													<Icon
														icon='Delete'
														className='fs-3'
														style={{ cursor: 'pointer' }}
														onClick={() => removeItem(index)}
													/>
												</td>
											</tr>
										);
									})}
								</tbody>
							</table>
							<TablePagination
								data={items}
								label='items'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</div>
					)}
				</>
			)}
		</>
	);
}
