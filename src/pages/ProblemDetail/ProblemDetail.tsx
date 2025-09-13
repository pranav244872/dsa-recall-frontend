import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProblemById, updateProblem } from '../../api/problemApi';
import { type Problem, type NewProblemForm } from '../../types/problem';
import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import ReactMarkdown from 'react-markdown';
import styles from './ProblemDetail.module.css';

// Language imports for syntax highlighting
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-c';
import 'prismjs/components/prism-cpp';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-java';
import 'prismjs/components/prism-csharp';

const supportedLanguages = [
  'javascript',
  'typescript',
  'python',
  'java',
  'csharp',
  'cpp',
];

const ProblemDetail = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();

  // State
  const [problem, setProblem] = useState<Problem | null>(null);
  const [formData, setFormData] = useState<NewProblemForm | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'markdown' | 'preview'>(
    'markdown',
  );

  // Fetch initial data
  useEffect(() => {
    if (!problemId) return;
    const fetchProblem = async () => {
      try {
        setLoading(true);
        const data = await getProblemById(parseInt(problemId, 10));
        setProblem(data);
        setFormData({
          Title: data.Title,
          Link: data.Link,
          Approach: data.Approach,
          Code: data.Code,
          Language: data.Language,
        });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch problem',
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [problemId]);

  // Handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    if (problem) {
      setFormData({
        // Reset form data to original state
        Title: problem.Title,
        Link: problem.Link,
        Approach: problem.Approach,
        Code: problem.Code,
        Language: problem.Language,
      });
    }
    setIsEditing(false);
    navigate(-1); // Discard changes and navigate back
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!problemId || !formData) return;
    setLoading(true);
    setError(null);
    try {
      const updatedProblem = await updateProblem(
        parseInt(problemId, 10),
        formData,
      );
      setProblem(updatedProblem); // Update the main problem state
      setIsEditing(false); // Switch back to read-only mode
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred.',
      );
    } finally {
      setLoading(false);
    }
  };

  // Render logic
  if (loading && !problem)
    return <p className={styles.centeredText}>Loading...</p>;
  if (error) return <p className={styles.centeredText}>Error: {error}</p>;
  if (!problem || !formData)
    return <p className={styles.centeredText}>Problem not found.</p>;

  return (
    <div className={styles.container}>
      {isEditing ? (
        // EDITING MODE FORM
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.topBar}>
            <button
              type="button"
              onClick={handleCancel}
              className={styles.backButton}
            >
              &larr; Cancel
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
              />
            </div>
            <div className={styles.buttonGroup}>
              <button
                type="submit"
                className={`${styles.button} ${styles.saveButton}`}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      ) : (
        // READ-ONLY MODE
        <div className={styles.topBar}>
          <button className={styles.backButton} onClick={() => navigate(-1)}>
            &larr; Back
          </button>
          <h1 className={styles.title}>{problem.Title}</h1>
          <button className={styles.button} onClick={() => setIsEditing(true)}>
            Edit
          </button>
        </div>
      )}

      {/* This layout is shared between both modes */}
      <div className={styles.editorLayout}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3>Approach</h3>
            {isEditing && (
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
            )}
          </div>
          {isEditing ? (
            activeTab === 'markdown' ? (
              <textarea
                name="Approach"
                className={styles.markdownEditor}
                value={formData.Approach}
                onChange={(e) =>
                  setFormData({ ...formData, Approach: e.target.value })
                }
              />
            ) : (
              <div className={styles.markdownPreview}>
                <ReactMarkdown>{formData.Approach}</ReactMarkdown>
              </div>
            )
          ) : (
            <div className={styles.markdownPreview}>
              <ReactMarkdown>{problem.Approach}</ReactMarkdown>
            </div>
          )}
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3>Code</h3>
            {isEditing ? (
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
            ) : (
              <span className={styles.languageDisplay}>{problem.Language}</span>
            )}
          </div>
          <div className={styles.codeEditorContainer}>
            <Editor
              value={isEditing ? formData.Code : problem.Code}
              onValueChange={(code) =>
                isEditing && setFormData({ ...formData, Code: code })
              }
              highlight={(code) =>
                Prism.highlight(
                  code,
                  Prism.languages[problem.Language] || Prism.languages.clike,
                  problem.Language,
                )
              }
              padding={10}
              className={styles.codeEditor}
              readOnly={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
