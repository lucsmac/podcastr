import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Podcastr</title>
      </Head>

      <main>
        <h1>Podcasts</h1>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes')
  const episodes = await response.json()

  return {
    props: {
      episodes
    },
    revalidate: 60 * 60 * 8,
  }
}
