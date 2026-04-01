import { useState, useEffect } from 'react';
import { Star, ThumbsUp, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { Tables } from '@/integrations/supabase/types';
import { format } from 'date-fns';

type Review = Tables<'reviews'>;

interface Props {
  productId: string;
}

export default function ReviewSection({ productId }: Props) {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sortBy, setSortBy] = useState<'latest' | 'top'>('latest');
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [username, setUsername] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => { fetchReviews(); }, [productId, sortBy]);

  const fetchReviews = async () => {
    const order = sortBy === 'top' ? 'helpful_count' : 'created_at';
    const { data } = await supabase.from('reviews')
      .select('*')
      .eq('product_id', productId)
      .order(order, { ascending: false });
    if (data) setReviews(data);
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : '0';

  const ratingDist = [5, 4, 3, 2, 1].map(n => ({
    stars: n,
    count: reviews.filter(r => r.rating === n).length,
    pct: reviews.length > 0 ? Math.round((reviews.filter(r => r.rating === n).length / reviews.length) * 100) : 0,
  }));

  const handleSubmit = async () => {
    if (!user || !comment.trim()) return;
    setSubmitting(true);
    await supabase.from('reviews').insert({
      product_id: productId,
      user_id: user.id,
      username: username.trim() || 'Anonymous',
      rating,
      comment: comment.trim(),
    });
    setComment('');
    setRating(5);
    setShowForm(false);
    await fetchReviews();
    setSubmitting(false);
  };

  return (
    <div className="mt-12 pt-8 border-t border-border/50">
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        {/* Rating Summary */}
        <div className="md:w-64 shrink-0">
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-bold font-serif">{avgRating}</span>
            <span className="text-muted-foreground text-sm">/ 5</span>
          </div>
          <div className="flex gap-0.5 mb-1">
            {[1, 2, 3, 4, 5].map(i => (
              <Star key={i} className={`w-4 h-4 ${i <= Math.round(Number(avgRating)) ? 'fill-primary text-primary' : 'text-muted'}`} />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mb-4">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>

          {/* Distribution bars */}
          <div className="space-y-1.5">
            {ratingDist.map(d => (
              <div key={d.stars} className="flex items-center gap-2 text-xs">
                <span className="w-3 text-right">{d.stars}</span>
                <Star className="w-3 h-3 fill-primary text-primary" />
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${d.pct}%` }} />
                </div>
                <span className="w-6 text-right text-muted-foreground">{d.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Write Review / Sort */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-2">
              <button onClick={() => setSortBy('latest')} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${sortBy === 'latest' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}>Latest</button>
              <button onClick={() => setSortBy('top')} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${sortBy === 'top' ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted'}`}>Top Rated</button>
            </div>
            {user && (
              <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:brightness-110">
                Write Review
              </button>
            )}
          </div>

          {/* Review Form */}
          {showForm && user && (
            <div className="bg-card rounded-xl border border-border/50 p-5 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm font-medium">Your Rating:</span>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => (
                    <button key={i} onMouseEnter={() => setHoverRating(i)} onMouseLeave={() => setHoverRating(0)} onClick={() => setRating(i)}>
                      <Star className={`w-5 h-5 transition-colors ${i <= (hoverRating || rating) ? 'fill-primary text-primary' : 'text-muted'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Your name (optional)"
                className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-primary/30" />
              <textarea value={comment} onChange={e => setComment(e.target.value)} placeholder="Share your experience..."
                rows={3} className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none" />
              <div className="flex gap-2">
                <button onClick={handleSubmit} disabled={submitting || !comment.trim()}
                  className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:brightness-110 disabled:opacity-50">
                  {submitting ? 'Posting...' : 'Submit Review'}
                </button>
                <button onClick={() => setShowForm(false)} className="px-5 py-2 rounded-xl border border-border text-sm hover:bg-muted">Cancel</button>
              </div>
            </div>
          )}

          {!user && !showForm && (
            <p className="text-sm text-muted-foreground mb-4">Sign in to write a review.</p>
          )}

          {/* Review List */}
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review.id} className="bg-card rounded-xl border border-border/50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                      {review.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{review.username}</p>
                      <p className="text-xs text-muted-foreground">{format(new Date(review.created_at), 'dd MMM yyyy')}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} className={`w-3.5 h-3.5 ${i <= review.rating ? 'fill-primary text-primary' : 'text-muted'}`} />
                    ))}
                  </div>
                </div>
                {review.comment && <p className="text-sm text-foreground/80 mb-2">{review.comment}</p>}
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2 mb-2">
                    {review.images.map((img, i) => (
                      <img key={i} src={img} alt="" className="w-16 h-16 rounded-lg object-cover border border-border" />
                    ))}
                  </div>
                )}
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{review.helpful_count} helpful</span>
                </div>
              </div>
            ))}
            {reviews.length === 0 && (
              <p className="text-center text-muted-foreground py-8">No reviews yet. Be the first!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
