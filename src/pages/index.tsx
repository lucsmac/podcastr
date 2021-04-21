import { GetStaticProps } from 'next';

import Head from 'next/head'
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';

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

interface HomeProps {
  episodes: Episode[];
}

export default function Home(props: HomeProps) {
  return (
    <div>
      <Head>
        <title>Podcastr</title>
      </Head>

      <main>
        <h1>{JSON.stringify(props.episodes)}</h1>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map((episode): Episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      duration: Number(episode.file.duration),
      description: episode.description,
      url: episode.file.url
    }
  })

  return {
    props: {
      episodes
    },
    revalidate: 60 * 60 * 8,
  }
}
