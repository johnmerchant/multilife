/** @jsx jsx */
import { jsx } from '@emotion/core';
import {
    TwitterIcon,
    TwitterShareButton,
    FacebookIcon,
    FacebookShareButton,
    RedditIcon,
    RedditShareButton
}
from 'react-share';
import { footerCss, shareButtonsCss, shareButtonCss } from '../styles';

export const Footer = () => <footer css={footerCss}>
    <p>Share MultiLife...</p>
    <div css={shareButtonsCss}>
        <TwitterShareButton css={shareButtonCss} url="https://multilife.live/" via="_jmercha" hashtags={['cellularautomata', 'multilife']}>
            <TwitterIcon size={32} />
        </TwitterShareButton>
        <RedditShareButton css={shareButtonCss} title="MutliLife" url="https://multilife.live/">
            <RedditIcon size={32} />
        </RedditShareButton>
        <FacebookShareButton css={shareButtonCss} url="https://multilife.live/" hashtag="cellularautomata">
            <FacebookIcon size={32} />
        </FacebookShareButton>
    </div>
</footer>;