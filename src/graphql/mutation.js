import { gql } from '@apollo/client';

export const ADD_SONG = gql`
    mutation addSong($title: String!, $thumbnail: String!, $artist: String!, $duration: Float!, $url: String!) {
        insert_songs(objects: {title: $title, thumbnail: $thumbnail, duration: $duration, url: $url, artist: $artist}) {
            affected_rows
        }
    }
`