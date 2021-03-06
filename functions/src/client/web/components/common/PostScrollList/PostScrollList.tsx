// @ts-nocheck
import React, { Component, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ScrollMenu from "react-horizontal-scrolling-menu";

import LeftIcon from '../../../../assets/icons/angle-left.svg'
import RightIcon from '../../../../assets/icons/angle-right.svg'

import styles from "./PostScrollList.module.css";
import { getDirectURL } from "../../../config/firebase";
import { useRouter }  from 'next/router'

const MenuItem = ({ url , title, id }) => {
  const router = useRouter()

  const [ imageSRC, setImageSRC ] = useState('')

  useEffect(() => {
    getDirectURL(url).then((src) => setImageSRC(src)).catch((error) => console.log(error))
  } , [url])

  return <div key={id}>
          <img onClick={() => router.push(`/post/${id}`)} src={imageSRC} className={`${styles.menuItem}`} />
        </div>;
};

export const Menu = list =>
  list.map(el => {
    const { name, imageURL, title, id } = el;

    return <MenuItem url={imageURL} id={id} title={title} text={name} key={id} />;
  });

const Arrow = ({ text, className }) => {
  return <div className={className}>
      <div style={{width:'30px'}}>
        {text === '<'?<LeftIcon /> : <RightIcon />}
      </div></div>;
};

Arrow.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
};

export const ArrowLeft = Arrow({ text: "<", className: styles.arrow });
export const ArrowRight = Arrow({ text: ">", className: styles.arrow });

class PostScrollList extends Component {
  state = {
    alignCenter: true,
    clickWhenDrag: false,
    dragging: true,
    hideArrows: true,
    hideSingleArrow: true,
    itemsCount: 0,
    selected: "item1",
    translate: 0,
    transition: 0.4,
    wheel: true
  };

  constructor(props) {
    props.list
    super(props);
    this.setState({itemsCount:props.list.length})
    this.menu = null;
    this.menuItems = Menu(props.list.slice(0, props.list.length), this.state.selected);
  }

  onUpdate = ({ translate }) => {
    this.setState({ translate });
  };

  onSelect = key => {
    this.setState({ selected: key });
  };

  componentDidUpdate(prevProps, prevState) {
    const { alignCenter } = prevState;
    const { alignCenter: alignCenterNew } = this.state;
    if (alignCenter !== alignCenterNew) {
      this.menu.setInitial();
    }
  }

  setItemsCount = ev => {
    const { itemsCount = this.props.list.length, selected } = this.state;
    const val = +ev.target.value;
    const itemsCountNew =
      !isNaN(val) && val <= this.props.list.length && val >= 0
        ? +ev.target.value
        : this.props.list.length;
    const itemsCountChanged = itemsCount !== itemsCountNew;

    if (itemsCountChanged) {
      this.menuItems = Menu(this.props.list.slice(0, itemsCountNew), selected);
      this.setState({
        itemsCount: itemsCountNew
      });
    }
  };

  setSelected = ev => {
    const { value } = ev.target;
    this.setState({ selected: String(value) });
  };

  render() {
    const {
      alignCenter,
      clickWhenDrag,
      hideArrows,
      dragging,
      hideSingleArrow,
      selected,
      translate,
      transition,
      wheel
    } = this.state;

    const menu = this.menuItems;

    return (
        <ScrollMenu
          ref={el => (this.menu = el)}
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          hideArrows={hideArrows}
          hideSingleArrow={hideSingleArrow}
          transition={+transition}
          onUpdate={this.onUpdate}
          onSelect={this.onSelect}
          selected={selected}
          translate={translate}
          alignCenter={alignCenter}
          dragging={dragging}
          clickWhenDrag={clickWhenDrag}
          wheel={wheel}
        />
    );
  }
}

PostScrollList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
}

export default PostScrollList;

