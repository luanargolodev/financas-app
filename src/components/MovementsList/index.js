import React from 'react';
import {
  Container,
  Type,
  IconView,
  TypeText,
  ValueText,
  DescriptionText
} from './styles';
import { TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function MovementsList({data, deleteItem}) {
 return (
    <TouchableWithoutFeedback onLongPress={() => deleteItem(data)}>
      <Container>
        <Type>
          <IconView type={data.type}>
            <Icon
              name={data.type === 'despesa' ? 'arrow-down' : 'arrow-up'}
              color="#fff"
              size={20}
            />
            <TypeText>{data.type}</TypeText>
          </IconView>
        </Type>
        <ValueText>
          R$ {data.value}
        </ValueText>
        <DescriptionText>
          {data.description}
        </DescriptionText>
      </Container>
    </TouchableWithoutFeedback>
  );
}