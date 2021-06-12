import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
import pkgTypeString from 'helpers/pkgTypeString';
import missingAssetThumb from 'assets/missing.png';

// Component imports
import Chip from 'components/Chip';
// import Chart from 'components/Chart';

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
  margin: 12px 12px 24px 12px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 392px;
  transition: opacity 100ms ease-out;
  margin-bottom: 12px;
  &:hover {
    opacity: 0.4;
    cursor: pointer;
    & div.thumb {
      height: 255px;
    }
    & span.summary {
      height: 65px;
    }
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
  transition: height 150ms cubic-bezier(0, 0, 0, 1);
  background-image: url("${(props) => props.thumbnail}");
  background-size: cover;
  background-color: rgb(33, 43, 54);
  box-shadow: 5px 5px 30px rgb(0 0 0 / 40%);
  border-radius: 16px;
  width: 275px;
  height: 275px;

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
  height: 18px;
  transition: height 150ms cubic-bezier(0, 0, 0, 1);
  margin-top: 4px;
`;

interface Props {
  asset: Asset;
}

function MenuCard(props: Props) {
  const { asset } = props;
  const history = useHistory();
  const dateString = DateTime.fromMillis(asset.updated * 1000).toFormat('dd/MM/yyyy');
  const pkgString = pkgTypeString(asset.packageType);

  const handleClick = () => {
    history.push(`/assets/${pkgString.toLowerCase()}/${asset.org.ident}.${asset.ident}`);
  };

  return (
    <Root>
      <Card onClick={handleClick}>
        <Image className="thumb" thumbnail={asset.thumb || missingAssetThumb}>
          <Chip fontSize="0.75rem">{asset.org.title}</Chip>
        </Image>
        <Title>{asset.title}</Title>
        <Date>{pkgString} - Updated {dateString}</Date>
        <Summary className="summary">{asset.summary}</Summary>
      </Card>
      {/* <Chart width={307} height={50} /> */}
    </Root>
  );
}

export default MenuCard;
export type { Asset };
