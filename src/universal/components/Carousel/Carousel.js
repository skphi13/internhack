import React, {Component} from 'react';
import {AspectRatioCard, AspectRatioCardImage, AspectRatioCardTitle, AspectRatioCardText} from '@homeaway/react-aspect-ratio-card';
import CardCarousel from '@homeaway/react-card-carousel';
import Items from 'Items';


class Carousel extends Component {
    constructor(props) {
        super(props);

        this.aspectRatio = '4x3';
        this.items = [
            {
                name: 'Austin',
                image: 'https://res.cloudinary.com/simpleview/image/upload/c_limit,f_auto,h_1200,q_75,w_1200/v1/clients/austin/Austin_Boardwalk_Photo_Credit_Arts_Labor_Internal_Use_Only_Request_Permissions_47b72dcc-3318-4990-8bd8-6f988525becb.jpg',
                desc: '',
            },
            {
                name: 'Dallas',
                image: 'https://www.100resilientcities.org/wp-content/uploads/2017/06/Dallas-hero-crop.jpg',
                desc: ''
            },
            {
                name: 'Houston',
                image: 'https://res.cloudinary.com/simpleview/image/upload/c_fill,f_auto,h_660,q_50,w_1920/v1/clients/houston/downtownskyline_dusk_2200x1458_fb275565-0b6b-482b-8d06-43c2cb3f03fd.jpg',
                desc: ''
            },
            {
                name: 'Los Angeles',
                image: 'http://lacity17.test-cityofla.acsitefactory.com/sites/g/files/wph781/f/styles/tiled_homepage_blog/public/bigstock-Los-Angeles-5909078.jpg?itok=ONWrQrCR',
                desc: ''
            },
            {
                name: 'Chicago',
                image: 'https://socialmediaweek.org/chicago/files/2017/05/chicago.jpg',
                desc: ''
            },
            {
                name: 'New York',
                image: 'https://photos.mandarinoriental.com/is/image/MandarinOriental/new-york-2017-columbus-circle-01?wid=2880&hei=1280&fmt=jpeg&crop=6,1064,4928,2190&anchor=2032,2134&qlt=75,0&op_sharpen=0&resMode=sharp2&op_usm=0,0,0,0&iccEmbed=0&printRes=72&fit=crop',
                desc: ''
            },
        ];

        this.cards = this.renderCards(this.items, this.items.length, this.aspectRatio, Math.round(1200 * (4 / 3)));
        this.handlePrevNext = this.handlePrevNext.bind(this);

        this.state = {
            index: 0
        };
    }
    actionClick() {
        window.alert('Please Log in!');
    }
    // Centers the controls within the image using the method from AspectRatioCard
    getControlOffset(aspectRatio) {
        return (width, controlHeight) => {
            return AspectRatioCard.getControlOffset(width, controlHeight, aspectRatio);
        };
    }

    // Handles previous and next click to adjust the index.
    handlePrevNext(evt, newIndex) {
        this.setState({index: newIndex});
    }

    // Utility method to randomly generate card content for the carousel.
    renderCards(items, length, aspectRatio, imgWidth) {
        let cards = [];
        for (let i = 0; i < length; i++) {
            const useLong = !!Math.round(Math.random());
            let title = items[i].name;
            let text = items[i].desc;

            cards.push(
                <AspectRatioCard aspectRatio={aspectRatio} key={`card-${i}`}>
                    <AspectRatioCardImage data-slot={'figure'} imageUri={items[i].image}/>
                    <AspectRatioCardTitle data-slot={'caption'} title={title}/>
                    <AspectRatioCardText data-slot={'content'} text={text}/>
                </AspectRatioCard>

            );
        }
        return cards;
    }

    render() {
        return (
            <CardCarousel
                actionText={'Start Planning'}
                actionHref={'https://www.homeaway.com'}
                actionHrefTarget={'_blank'}
                breakpoints={{
                    '820': 4,
                    '540': 3,
                    '0': 2,
                }}
                cardIndex={this.state.index}
                getControlOffset={this.getControlOffset(this.aspectRatio)}
                onNextClick={this.handlePrevNext}
                onPreviousClick={this.handlePrevNext}
                onActionClick={this.actionClick}
                nextLabel={'Next'}
                paging
                previousLabel={'Previous'}
                title={'Popular Destinations'}
            >
                {this.cards}
            </CardCarousel>
        );
    }
}

export default Carousel;