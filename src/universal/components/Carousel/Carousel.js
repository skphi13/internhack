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
                name: "Bike",
                image:"https://farm3.staticflickr.com/2408/2290514556_4290c1e408_z.jpg?zz&#x3D;1",
                desc:"Comuter bike great for riding to and from work."
            },
            {
                name:"$100.00",
                image:"https://farm8.staticflickr.com/7154/6757867273_9da5ec1a01_z.jpg",
                desc:"Borrow a 100 bucks!"
            },
            {
                name: "Old Cool Car",
                image:"https://farm3.staticflickr.com/2909/14343632187_367a706e42_z.jpg",
                desc:"Impress your friends or go to a car show with this vintage automobile."
            },
            {
                name:"Expresso Machine",
                image:"https://farm9.staticflickr.com/8614/15889840936_e4e7c24e2f_z.jpg",
                desc:"Make expresso and get work done"
            },
            {
                name:"Mac Keyboard",
                image:"https://farm4.staticflickr.com/3159/2656481112_e228ee592d_z.jpg",
                desc:"Mac keyboard up for grabs. Lightly used."
            },
            {
                name:"Aged Book",
                image:"https://farm5.staticflickr.com/4763/39664194771_c279ebcf5e_z.jpg",
                desc:"This is a pretty cool looking aged book. Spruce up your decor with this statement peice. Its probably not '50 Shades of Gray'."
            },
            {
                name:"Spyro the Dragon",
                image:"http://www.mobygames.com/images/covers/l/17925-spyro-the-dragon-playstation-front-cover.jpg",
                desc:"Spyro the Dragon, who lives by the sea."
            },
            {
                name:"Necklace",
                image:"https://www.claires.com/dw/image/v2/BBTK_PRD/on/demandware.static/-/Sites-master-catalog/default/dwbc3b2b4c/images/hi-res/09124_1.jpg?sw=2000&sh=2000&sm=fit",
                desc:"I left my computer unlocked and someone ordered this neclace on my Amazon account."
            }
        ];

        this.cards = this.renderCards(this.items, this.items.length, this.aspectRatio, Math.round(1200 * (4 / 3)));
        this.handlePrevNext = this.handlePrevNext.bind(this);

        this.state = {
            index: 0
        };
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
                breakpoints={{
                    '820': 4,
                    '540': 3,
                    '0': 2
                }}
                cardIndex={this.state.index}
                getControlOffset={this.getControlOffset(this.aspectRatio)}
                onNextClick={this.handlePrevNext}
                onPreviousClick={this.handlePrevNext}
                nextLabel={'Next'}
                paging
                previousLabel={'Previous'}
                title={'Available Items'}
            >
                {this.cards}
            </CardCarousel>
        );
    }
}

export default Carousel;