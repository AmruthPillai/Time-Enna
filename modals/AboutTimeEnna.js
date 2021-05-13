import cx from 'classnames';
import { FaCoffee, FaGitAlt } from 'react-icons/fa';
import { useRecoilState } from 'recoil';

import { aboutModalOpenState } from '../atoms';
import Button from '../components/Button';
import Logo from '../components/Logo';
import Modal from '../components/Modal';
import styles from '../styles/modals/AboutTimeEnna.module.css';
import { openLinkInNewTab } from '../utils';

const AboutTimeEnna = () => {
  const [isOpen, setOpen] = useRecoilState(aboutModalOpenState);

  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)} className={styles.modal}>
      <section className={cx(styles.container)}>
        <Logo small disableAnimation />

        <p className="mt-8">Hey Stranger,</p>
        <p>
          Thank you for dropping in and checking out this little project of mine. You are awesome,
          and I hope you have a great day!
        </p>
        <p>
          <strong>Who am I?</strong>
          <br />
          No one special, just another dev who loves to build stuff. You might also know me for
          having built{' '}
          <a href="https://rxresu.me/" target="_blank" rel="noreferrer">
            Reactive Resume
          </a>{' '}
          or from my{' '}
          <a href="https://www.amruthpillai.com/" target="_blank" rel="noreferrer">
            personal website
          </a>
          .
        </p>
        <p>
          <strong>What&apos;s up with the name?</strong>
          <br />
          &quot;Time Enna?&quot; is a phrase in Tamil (my native toungue) that just translates to
          &quot;What time is it?&quot;. I was sleep-deprived when I came up with the name, so
          don&apos;t judge me for it.
        </p>
        <p>
          <strong>Why did I build this?</strong>
          <br />
          On a busy work-week, right-smack in the middle of a pandemic, while working with a team
          that&apos;s spread across the world, it became harder for me to coordinate across
          different timezones and working with different people.
        </p>

        <p>
          So I built Time:Enna with a simple user interface that allows you to glance at the time
          across multiple timezones in an instant, so I don&apos;t set up meetings in the middle of
          their sleep.
        </p>
      </section>

      <div className={cx(styles.footer)}>
        <Button
          icon={FaCoffee}
          onClick={() => openLinkInNewTab('https://www.buymeacoffee.com/AmruthPillai')}
        >
          Buy me a Coffee
        </Button>

        <Button
          icon={FaGitAlt}
          onClick={() => openLinkInNewTab('https://github.com/AmruthPillai/Time-Enna')}
        >
          Source Code
        </Button>
      </div>
    </Modal>
  );
};

export default AboutTimeEnna;
