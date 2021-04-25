import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { RichText } from 'prismic-dom'
import { Client } from '../../services/prismic'

import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString'

import styles from '../../styles/pages/episode.module.scss'
import Head from 'next/head'
import { usePlayer } from '../../contexts/PlayerContext'

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  members: string;
  duration: number;
  durationAsString: string;
  publishedAt: string;
  url: string;
}

interface EpisodeProps {
  episode: Episode;
}

export default function Episode({ episode }: EpisodeProps) {
  const { play } = usePlayer()
  
  return (
    <div className={styles.episode}>
      <Head>
        <title>{episode.title} | Podcastr</title>
      </Head>

      <div className={styles.thumbnailContainer}>
        <Link href="/">
          <button type="button">
            <img src="/arrow-left.svg" alt="voltar" />
          </button>
        </Link>
        <Image
          width={700}
          height={160}
          src={episode.thumbnail}
          objectFit="cover"
        />
        <button type="button" onClick={() => play(episode)}>
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.publishedAt}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div
        className={styles.description}
        dangerouslySetInnerHTML={{ __html: RichText.asHtml(episode.description) }}
      />
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // const { data } = await api.get('episodes', {
  //   params: {
  //     _limit: 2,
  //     _sort: 'publishet_at',
  //     _order: 'desc'
  //   }
  // })

  // const paths = data.map(episode => {
  //   return {
  //     params: {
  //       slug: episode.id
  //     }
  //   }
  // })
  
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug } = ctx.params

  const response = await Client.getByUID('episode', String(slug), {})
  
  const episode = {
    id: response.uid,
    title: response.data.title[0].text,
    thumbnail: response.data.thumbnail.url,
    members: response.data.members,
    publishedAt: format(parseISO(response.data.published_at), 'd MMM yy', { locale: ptBR }),
    durationAsString: convertDurationToTimeString(Number(response.data.file[0].duration)),
    duration: Number(response.data.file[0].duration),
    url: response.data.file[0].url.url,
    description: response.data.description,
  }
  
  return {
    props: {
      episode
    },
    revalidate: 60 * 60, // 24 hours
  }
}
