import Prism from 'prismjs';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type NewProblemForm } from '../../types/problem';
import { createProblem } from '../../api/problemApi';
import Alert from '../../components/Alert/Alert';
import Editor from 'react-simple-code-editor';
// Import languages for syntax highlighting
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-csharp';
import ReactMarkdown from 'react-markdown';
import styles from './NewProblem.module.css';

// Supported languages for the dropdown
const supportedLanguages = [
  'javascript',
  'typescript',
  'python',
  'java',
  'csharp',
  'cpp',
];

const NewProblem = () => {
  const [formData, setFormData] = useState<NewProblemForm>({
    Title: '',
    Link: '',
    Approach: '',
    Code: '',
    Language: 'javascript', // Default language
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'markdown' | 'preview'>(
    'markdown',
  );
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createProblem(formData);
      navigate('/dashboard'); // Redirect to dashboard on success
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div className={styles.topBar}>
        <button
          type="button"
          onClick={handleBack}
          className={styles.backButton}
        >
          &larr; Back
        </button>
        <div className={styles.formGroup}>
          <label htmlFor="Title">Title</label>
          <input
            type="text"
            id="Title"
            name="Title"
            className={styles.input}
            value={formData.Title}
            onChange={handleInputChange}
            required
            placeholder="e.g., Two Sum"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="Link">Link</label>
          <input
            type="url"
            id="Link"
            name="Link"
            className={styles.input}
            value={formData.Link}
            onChange={handleInputChange}
            required
            placeholder="e.g., https://leetcode.com/problems/two-sum/"
          />
        </div>
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Saving...' : 'Save Problem'}
        </button>
      </div>

      {error && <Alert message={error} type="error" />}

      <div className={styles.editorLayout}>
        {/* Approach Panel */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3>Approach</h3>
            <div className={styles.tabs}>
              <button
                type="button"
                className={activeTab === 'markdown' ? styles.activeTab : ''}
                onClick={() => setActiveTab('markdown')}
              >
                Markdown
              </button>
              <button
                type="button"
                className={activeTab === 'preview' ? styles.activeTab : ''}
                onClick={() => setActiveTab('preview')}
              >
                Preview
              </button>
            </div>
          </div>
          {activeTab === 'markdown' ? (
            <textarea
              name="Approach"
              className={styles.markdownEditor}
              value={formData.Approach}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, Approach: e.target.value }))
              }
            />
          ) : (
            <div className={styles.markdownPreview}>
              <ReactMarkdown>{formData.Approach}</ReactMarkdown>
            </div>
          )}
        </div>

        {/* Code Panel */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3>Code</h3>
            <select
              name="Language"
              value={formData.Language}
              onChange={handleInputChange}
              className={styles.languageSelect}
            >
              {supportedLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.codeEditorContainer}>
            <Editor
              value={formData.Code}
              onValueChange={(code) =>
                setFormData((prev) => ({ ...prev, Code: code }))
              }
              highlight={(code) =>
                Prism.highlight(
                  code,
                  Prism.languages[formData.Language],
                  formData.Language,
                )
              }
              padding={10}
              className={styles.codeEditor}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default NewProblem;
