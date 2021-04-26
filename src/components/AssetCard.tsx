import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
import pkgTypeString from 'helpers/pkgTypeString';

interface Asset {
  org: {
    ident: string;
    title: string;
  };
  ident: string;
  title: string;
  summary: string;
  thumb: string;
  packageType: number;
  updated: number;
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: 12px 12px 36px 12px;
  border-radius: 16px;
  transition: opacity 100ms ease-out;
  &:hover {
    opacity: 0.4;
    cursor: pointer;
  }
`;

interface CardProps {
  thumbnail: string;
}

const Image = styled.div<CardProps>`
  display: flex;
  align-items: flex-end;
  padding: 16px;
  margin-bottom: 16px;
  background-image: url("${(props) => props.thumbnail}");
  background-size: cover;
  background-color: rgb(33, 43, 54);
  box-shadow: 5px 5px 30px rgb(0 0 0 / 40%);
  border-radius: 16px;
  width: 275px;
  height: 275px;
`;

const Chip = styled.div`
  color: white;
  padding: 6px 8px 6px 8px;
  border-radius: 16px;
  font-weight: 700;
  font-size: 0.75rem;
  background-color: rgba(0,0,0,0.4);
  backdrop-filter: blur(10px);
  cursor: default;
  user-select: none;
`;

const Title = styled.span`
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
  width: 275px;
`;

const Date = styled.span`
  color: white;
  opacity: 0.4;
  font-weight: 500;
  font-size: 0.75rem;
  width: 275px;
`;

const Summary = styled.span`
  color: white;
  opacity: 0.6;
  font-size: 0.75rem;
  width: 275px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 4px;
`;

interface Props {
  asset: Asset;
}

function MenuCard(props: Props) {
  const history = useHistory();
  const { asset } = props;
  const dateString = DateTime.fromMillis(asset.updated * 1000).toFormat('dd/MM/yyyy');
  const pkgString = pkgTypeString(asset.packageType);

  const handleClick = () => {
    history.push(`/assets/${pkgString.toLowerCase()}/${asset.org.ident}.${asset.ident}`);
  };

  return (
    <Root onClick={handleClick}>
      <Image thumbnail={asset.thumb}>
        <Chip>{asset.org.title}</Chip>
      </Image>
      <Title>{asset.title}</Title>
      <Date>{pkgString} - Updated {dateString}</Date>
      <Summary>{asset.summary}</Summary>
    </Root>
  );
}

export default MenuCard;
export type { Asset };
