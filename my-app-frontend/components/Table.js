import styled from 'styled-components';

const StyledTable = styled.table`
width:100%;
th{
    text-align: left;
    text-transform: uppercase;
    color: #aaa;
    font-weight: 500;
    font-size: .7rem;
}
`;
export default function Table(props) {
  return <StyledTable {...props}/>
}
